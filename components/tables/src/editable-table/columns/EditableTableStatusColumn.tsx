import React, { ReactNode } from 'react';

import { Box, Flex, Icon, Label } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';
import { Ellipsis, LoadingSpinner, ReadMore } from 'z-frontend-elements';
import { InformationPopover, Tooltip } from 'z-frontend-overlays';

import { ColumnNameMapping, Errors, RowStateContext } from '../EditableRow';
import Column from '../../DataTableColumn';
import { SaveStateContext } from '../SaveStateManager';

export const ROW_ERROR_KEY = '_rowError';

type ErrorSummary = {
  count: number;
  fieldsWithErrors: string[];
  rowErrors: string[];
};

type StatusColumnProps<RowObject> = {
  /**
   * If true, column can never be scrolled off-screen
   * @default false
   */
  isFixed?: boolean;
  width?: number;
  createErrorSummary?: (errors: Errors) => ReactNode;
};

export default class StatusColumn<RowObject> extends React.Component<StatusColumnProps<RowObject>> {
  static displayName = 'EditableTableStatusColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.StatusColumn should never be rendered.');
    return null;
  }
}

export const STATUS_COLOR_MAP = {
  clean: 'grayscale.f',
  error: 'negation.a',
};

export const DEFAULT_STATUS_COLUMN_WIDTH = 40;

const statusIndicatorSize = 12;

// This wrapper is needed to prevent a visual bug in chrome where cell size is changing
// after save
const CellBody = styled(Flex)`
  height: 24px;
`;
CellBody.defaultProps = {
  align: 'center',
};

const Circle = styled(Flex)<{ clickable: boolean }>`
  border-radius: 50%;
  ${props => (props.clickable ? 'cursor: pointer' : '')};
`;
Circle.defaultProps = {
  clickable: true,
  width: statusIndicatorSize,
  height: statusIndicatorSize,
  align: 'center',
  justify: 'center',
};

const PopoverContent = styled(Box)`
  white-space: normal;
`;

const ErrorIcon = styled(Icon)`
  cursor: pointer;
`;

const BlockLoadingSpinner = styled(LoadingSpinner)`
  display: block;
`;

const StatusColumnHeader = () => (
  <Tooltip
    event="hover"
    placement="bottom"
    showArrow
    // Pushing content down to avoid styling bug in chrome where sticky-positioned headers don't respect z-index
    popperModifiers={{
      offset: {
        offset: '0px, 11px',
      },
    }}
    targetBody={
      <Circle
        bg={STATUS_COLOR_MAP['clean']}
        data-testid="status-indicator-for-header"
        data-test-color={STATUS_COLOR_MAP['clean']}
        color="grayscale.white"
        clickable={false}
      />
    }
  >
    <div className="icon-header-tooltip-wrapper">Row Status</div>
  </Tooltip>
);

function summarizeErrors(errors: Errors, columnNameMapping: ColumnNameMapping): ErrorSummary {
  const count = Object.values(errors).reduce((sum, errors) => sum + errors.length, 0);
  const fieldsWithErrors = Object.keys(errors)
    .filter(key => errors[key] && errors[key].length > 0 && key !== ROW_ERROR_KEY)
    .map(key => {
      if (!columnNameMapping[key] && key !== ROW_ERROR_KEY) {
        console.error(
          `Validation error assigned to a row key (${key}) that does not have a corresponding column label.`,
        );
      }

      return columnNameMapping[key];
    })
    .filter(i => i);

  const rowErrors = errors[ROW_ERROR_KEY] || [];
  const rowErrorMessages = rowErrors.slice(0, 3).map(error => error.message);
  if (rowErrors.length > 3) {
    rowErrorMessages[2] = `${rowErrors.length - 2} additional errors`;
  }

  return { count, fieldsWithErrors, rowErrors: rowErrorMessages };
}

class DefaultErrorSummary extends React.Component<{
  fieldsWithErrors: string[];
  fieldErrorLabelId: string;
  rowErrors: string[];
  rowErrorLabelId: string;
}> {
  render() {
    const { fieldsWithErrors, fieldErrorLabelId, rowErrors, rowErrorLabelId } = this.props;

    const fieldErrorSummary = fieldsWithErrors.length ? (
      <div className="error-popover-section">
        <Label className="error-popover-label" id={fieldErrorLabelId}>
          Fields with errors:
        </Label>
        <ReadMore lines={2} isExpandControlHiddenOnResize aria-labelledby={fieldErrorLabelId}>
          {fieldsWithErrors.join(', ')}
        </ReadMore>
      </div>
    ) : null;

    const rowErrorSummary = rowErrors.length ? (
      <div className="error-popover-section">
        <Label className="error-popover-label" id={rowErrorLabelId}>
          {fieldsWithErrors.length ? 'Other errors:' : 'Errors:'}
        </Label>
        <ul className="error-popover-list" aria-labelledby={rowErrorLabelId}>
          {rowErrors.map(error => (
            <li key={error}>
              <Ellipsis>{error}</Ellipsis>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

    return (
      <>
        {fieldErrorSummary}
        {rowErrorSummary}
      </>
    );
  }
}

// Using a function here because DataTable expects Column components as immediate children
export function generateStatusColumn<RowObject>(props: StatusColumnProps<RowObject>) {
  return (
    <Column<RowObject>
      key="data-table-status-column"
      contentType="single-checkbox"
      width={props.width || DEFAULT_STATUS_COLUMN_WIDTH}
      isFixed={props.isFixed}
      cellStyles={{
        pl: 4,
        pr: 0,
        minWidth: DEFAULT_STATUS_COLUMN_WIDTH,
      }}
      headerLabel="Row Status"
      renderHeader={() => (
        <div className="data-table-status-column-header">
          <StatusColumnHeader />
        </div>
      )}
    >
      {({ rowIndex, rowKey }) => (
        <CellBody>
          <SaveStateContext.Consumer>
            {({ helpers }) => (
              <RowStateContext.Consumer>
                {({ deleted, errors, columnNameMapping }) => {
                  const circleColor = STATUS_COLOR_MAP['clean'] as ColorString;
                  const circleProps = {
                    bg: circleColor,
                    color: 'grayscale.white',
                    'data-test-color': circleColor,
                  };

                  if (deleted) {
                    return <Circle {...circleProps} aria-label={`Row ${rowIndex} has been deleted`} />;
                  } else if (helpers.getSaveStateForKey(rowKey).status === 'saving') {
                    return (
                      <BlockLoadingSpinner
                        maxWidth={statusIndicatorSize}
                        maxHeight={statusIndicatorSize}
                        data-testid={`loading-spinner-for-row-${rowIndex}`}
                      />
                    );
                  }

                  const errorSummary = summarizeErrors(errors, columnNameMapping);
                  const { count: errorCount, fieldsWithErrors, rowErrors } = errorSummary;

                  const popoverTitle = `${errorCount} Error${errorCount !== 1 ? 's' : ''} in This Row`;
                  if (errorCount > 0) {
                    const errorIconColor = STATUS_COLOR_MAP['error'] as ColorString;
                    const errorIcon = (
                      <ErrorIcon
                        iconName="alert-circle"
                        color={errorIconColor as ColorString}
                        data-test-color={errorIconColor}
                        role="button"
                        aria-label={`Open status popover for row ${rowIndex}`}
                      />
                    );

                    const fieldErrorLabelId = `field-errors-label-${rowIndex}`;
                    const rowErrorLabelId = `row-errors-label-${rowIndex}`;

                    return (
                      <InformationPopover
                        positionFixed
                        title={popoverTitle}
                        event="click"
                        showArrow
                        targetBody={errorIcon}
                        placement="bottom"
                        popperModifiers={{
                          preventOverflow: {
                            boundariesElement: 'viewport',
                          },
                        }}
                      >
                        <PopoverContent data-testid={`status-error-popover-content-${rowIndex}`}>
                          {props.createErrorSummary ? (
                            props.createErrorSummary(errors)
                          ) : (
                            <DefaultErrorSummary
                              fieldsWithErrors={fieldsWithErrors}
                              fieldErrorLabelId={fieldErrorLabelId}
                              rowErrors={rowErrors}
                              rowErrorLabelId={rowErrorLabelId}
                            />
                          )}
                        </PopoverContent>
                      </InformationPopover>
                    );
                  }

                  return (
                    <InformationPopover
                      title={popoverTitle}
                      event="click"
                      showArrow
                      placement="bottom"
                      positionFixed
                      popperModifiers={{
                        preventOverflow: {
                          boundariesElement: 'viewport',
                        },
                      }}
                      targetBody={<Circle {...circleProps} aria-label={`Open status popover for row ${rowIndex}`} />}
                    >
                      No errors found on this row.
                    </InformationPopover>
                  );
                }}
              </RowStateContext.Consumer>
            )}
          </SaveStateContext.Consumer>
        </CellBody>
      )}
    </Column>
  );
}
