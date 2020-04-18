import React from 'react';

import { Box } from 'zbase';
import { InfoButton, Link } from 'z-frontend-elements';
import { Banner, BannerFlexContainerProps } from 'z-frontend-composites';
import { Tooltip } from 'z-frontend-overlays';

import { SaveStateContext, SaveStateHelpers } from './SaveStateManager';

type SaveFailedErrorBannerProps<Record> = {
  /**
   * Callback to fire with failed save records.
   * Will be called with all the last attempted save values
   */
  onRetry?: (failures: Record[]) => Promise<any>;

  /**
   * Returns string label for every failed record
   */
  getFailureLabel: (record: Record) => string;

  /**
   * Gets key used to identify record
   * When using with EditableTable this function should match the getRowKey function
   * passed to the EditableTable component
   */
  getRecordKey: (record: Record) => number | string;

  /**
   * Location API (by default provided by window)
   */
  location?: {
    reload: () => void;
  };
} & BannerFlexContainerProps;

export default class SaveFailedErrorBanner<Record> extends React.Component<SaveFailedErrorBannerProps<Record>> {
  static defaultProps = {
    location: window.location,
  };

  retryFailures = async (records: Record[], helpers: SaveStateHelpers<Record>) => {
    const { getRecordKey } = this.props;

    records.forEach(record => {
      helpers.markRecordSaving(getRecordKey(record));
    });

    this.props
      .onRetry(records)
      .then(result => {
        /*
        This logic would make it possible to support for selecting which records will be marked as saved
        Commenting this out for now because it makes the API more confusing and it's not clear if it's
        necessary.

        if (Array.isArray(result)) {
          const savedResultsKeys = new Set(result.map(record => getRecordKey(record)));
          records.forEach(record => {
            const recordKey = getRecordKey(record);
            if (savedResultsKeys.has(recordKey)) {
              helpers.markRecordSaved(getRecordKey(record));
            } else {
              helpers.markRecordFailed(getRecordKey(record));
            }
          });
        */
        records.forEach(record => {
          helpers.markRecordSaved(getRecordKey(record));
        });
      })
      .catch(() => {
        records.forEach(record => {
          helpers.markRecordFailed(getRecordKey(record));
        });
      });
  };

  render() {
    const { getFailureLabel, getRecordKey, onRetry, location, ...containerProps } = this.props;

    return (
      <SaveStateContext.Consumer>
        {({ failures, helpers }) => {
          const numFailures = failures.length;
          const tooltipAnchor = (
            <InfoButton mr={1}>
              {numFailures} {numFailures > 1 ? 'records' : 'record'}
            </InfoButton>
          );
          return numFailures ? (
            <Banner type="error" showIcon={false} isClosable={false} {...containerProps}>
              <Tooltip event="hover" placement="top" showArrow targetBody={tooltipAnchor}>
                <Box p={2}>{failures.map(saveState => getFailureLabel(saveState.record)).join(', ')}</Box>
              </Tooltip>
              failed to save. Please
              {this.props.onRetry && (
                <>
                  <Link
                    role="button"
                    tabIndex={0}
                    px={1}
                    onClick={() => {
                      this.retryFailures(
                        failures.map(failure => failure.record),
                        helpers,
                      );
                    }}
                  >
                    retry failures
                  </Link>
                  or
                </>
              )}
              <Link
                role="button"
                tabIndex={0}
                px={1}
                onClick={() => {
                  location.reload();
                }}
              >
                reload page.
              </Link>
            </Banner>
          ) : null;
        }}
      </SaveStateContext.Consumer>
    );
  }
}
