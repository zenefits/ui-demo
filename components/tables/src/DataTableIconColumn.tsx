import React from 'react';

import { IconProps } from 'zbase';
import { Popover, Tooltip } from 'z-frontend-overlays';
import { theme } from 'z-frontend-theme';
import { throwInDevelopment } from 'z-frontend-app-bootstrap';

import Column from './DataTableColumn';
import { KEY_CODES } from './GridAccessibilityProvider';
import { SaveStateContext } from './editable-table/SaveStateManager';

type IconComponentProps<RowObject> = {
  row?: RowObject;
  isHeader?: boolean;
  /**
   * Use this instead of normal onClick so that the function can also be triggered by Enter key.
   * Cannot use onClick directly because we need to call the function on Enter key. At that time, we don't have a click
   * event to pass in as the argument.
   * Normal onClick prop is removed for this component to reduce confusion.
   */
  customOnClick?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

type TriggerRowSaveFn<RowObject> = (args: { record: RowObject; savingPromise: Promise<any> }) => void;

type IconColumnProps<RowObject> = {
  /**
   * Label for column header.  Will appear in tooltip
   */
  headerLabel: string;
  /**
   * If true, column can never be scrolled off-screen
   * @default false
   */
  isFixed?: boolean;
  /**
   * Return accessibility label for each row's icon
   * Do not return an empty string!
   */
  getAriaLabelForCellIcon: (row: RowObject) => string;
  /**
   * Name of icon to show, or a function that returns an icon name.
   */
  iconName: IconProps['iconName'] | ((args: { row: RowObject; isHeader: boolean }) => IconProps['iconName']);
  /**
   * If provided, getTitle and getBody will respectively render the title and body of a popover when
   * icon is clicked
   */
  popover?: {
    getTitle: (params: { row: RowObject }) => string;
    getBody: (params: { row: RowObject }) => React.ReactNode;
  };
  /**
   * Fired when cell icon is clicked
   */
  onClick?: (params: { row: RowObject }) => void;
  /**
   * Called for each row.  If returns true, row's icon will be disabled
   */
  isDisabled?: (row: RowObject, isSaving: boolean) => boolean;
  /**
   * Overrides cell body logic.  Please consult a UIE before using this prop
   */
  customBody?: (args: {
    row: RowObject;
    IconComponent: React.FunctionComponent<IconComponentProps<RowObject>>;
    iconProps: IconComponentProps<RowObject>;
    triggerRowSave: TriggerRowSaveFn<RowObject>;
  }) => JSX.Element;
};

export default class IconColumn<RowObject> extends React.Component<IconColumnProps<RowObject>> {
  static displayName = 'DataTableIconColumn';

  // @ts-ignore
  render() {
    throw new Error('DataTableIconColumn should never be rendered.');
    return null;
  }
}

export const DEFAULT_ICON_COLUMN_WIDTH = 48;

// Using a function here because DataTable expects Column components as immediate children
export function generateIconColumn<RowObject>(props: IconColumnProps<RowObject>) {
  if (props.onClick && props.popover) {
    throwInDevelopment('Icon Column should not have both popover and onClick props provided.');
  }

  const IconComponent = (iconProps: IconComponentProps<RowObject>) => {
    const { customOnClick, row, isHeader, ...rest } = iconProps;
    const iconName = typeof props.iconName === 'function' ? props.iconName({ row, isHeader }) : props.iconName;
    // Our icons are stored in theme now as strings in the format "\HEXCODE" (literal backslash, not escape char)
    // In this format, the "content" css property can be set to one of these values directly when using ::before
    // pseudoselector (this is have zbase works)
    // We don't have access ::before pseudoselector here, so we need to do things a bit differently
    //
    // First slice off the leading backslash to get just the hexcode
    const iconHexCode = theme.icons[iconName].slice(1);
    // Then get character corresponding to hexcode (using hexcode directly as a variable will be escaped by JSX)
    const iconCharacter = String.fromCodePoint(parseInt(iconHexCode, 16));

    const onKeyUp = (e: React.KeyboardEvent) => {
      if (e.keyCode === KEY_CODES.ENTER) {
        customOnClick?.();
      }
    };

    return (
      <i
        {...rest}
        className={iconProps.className ? `data-table-icon ${iconProps.className}` : 'data-table-icon'}
        data-testid="DataTableIconColumnIcon"
        data-test-icon-name={iconName}
        onClick={customOnClick}
        onKeyUp={onKeyUp}
        role={customOnClick && 'button'}
        style={{
          cursor: customOnClick && 'pointer',
        }}
        tabIndex={0} // eslint-disable-line
      >
        {iconCharacter}
      </i>
    );
  };

  return (
    <Column<RowObject>
      key="data-table-icon-column"
      contentType="single-checkbox"
      width={DEFAULT_ICON_COLUMN_WIDTH}
      isFixed={props.isFixed}
      cellStyles={{
        minWidth: DEFAULT_ICON_COLUMN_WIDTH,
      }}
      textAlign="center"
      headerLabel={props.headerLabel}
      renderHeader={row => (
        <div className="icon-header-wrapper">
          <Tooltip
            event="hover"
            placement="bottom"
            showArrow
            targetBody={
              <div className="icon-header-tooltip-target-wrapper">
                <IconComponent isHeader />
              </div>
            }
            // Pushing content down to avoid styling bug in chrome where sticky-positioned headers don't respect z-index
            popperModifiers={{
              offset: {
                offset: '0px, 6px',
              },
            }}
          >
            <div className="icon-header-tooltip-wrapper">{props.headerLabel}</div>
          </Tooltip>
        </div>
      )}
    >
      {({ row, rowKey }) => {
        const ariaLabel = props.getAriaLabelForCellIcon(row);
        // Used when not disabled and not having popover
        const iconProps: Partial<IconComponentProps<RowObject>> = {
          row,
          customOnClick: props.onClick && (() => props.onClick({ row })),
          'aria-label': ariaLabel,
        };

        return (
          <SaveStateContext.Consumer>
            {({ helpers }) => {
              const isSaving = rowKey && helpers.getSaveStateForKey(rowKey).status === 'saving';
              const isDisabled = props.isDisabled && props.isDisabled(row, isSaving);
              const triggerRowSave: TriggerRowSaveFn<RowObject> = ({ record, savingPromise }) => {
                helpers.startSaveForKey(rowKey, {
                  record,
                  promise: savingPromise,
                });
              };

              if (isDisabled) {
                return <IconComponent row={row} className="disabled-icon" aria-label={ariaLabel} />;
              } else if (props.customBody) {
                return props.customBody({ row, IconComponent, iconProps, triggerRowSave });
              } else if (props.popover) {
                return (
                  <Popover
                    title={props.popover.getTitle({ row })}
                    event="click"
                    showArrow
                    positionFixed
                    targetBody={
                      <IconComponent aria-label={ariaLabel} className="icon-column-popover-target" row={row} />
                    }
                  >
                    <div className="wrap-text">{props.popover.getBody({ row })}</div>
                  </Popover>
                );
              } else {
                return <IconComponent {...iconProps} />;
              }
            }}
          </SaveStateContext.Consumer>
        );
      }}
    </Column>
  );
}
