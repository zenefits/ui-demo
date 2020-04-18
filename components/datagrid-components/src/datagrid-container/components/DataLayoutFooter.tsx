import React from 'react';
import gql from 'graphql-tag';

import { Box, Flex } from 'zbase';
import { ConfirmationModal, DialogsManager, DialogProps, ModalButton } from 'z-frontend-layout';
import { Mutation } from 'z-frontend-network';
import { FormFooter } from 'z-frontend-forms';
import { Link } from 'z-frontend-elements';
import { SaveStateHelpersContext } from 'z-frontend-tables';
import { getApollo } from 'z-frontend-app-bootstrap';

import { ResetDatagridMutation, SubmitDatagridMutation } from '../../gqlTypes';
import { ButtonKey, ConfirmationModalInfo, ModalButton as ModalButtonFromGql, ModalButtonAction } from '../../types';

type DataLayoutFooterProps = {
  datagridId: string;
  sourceData: any[];
  /** Function to trigger a loading screen when waiting for submission to finish */
  startSubmitting: () => void;
  /** Flag to hide "Reset" button */
  showReset?: boolean;
  /** A URL to redirect users out of Data Ingestion Flow app */
  returnUrl: string;
  /** A flag to allow users to save datagrid as draft or not */
  allowSaveDraft?: boolean;
};

type DataLayoutFooterState = {
  isFinishLaterButtonLoading: boolean;
  isSubmitButtonLoading: boolean;
  confirmationModalInfo: ConfirmationModalInfo;
};

const confirmationModalQuery = gql`
  query ConfirmationModalQuery($datagridId: ID!) {
    datagridSubmissionStatus(datagridId: $datagridId) {
      title
      body
      primaryOption {
        text
        action
        link
      }
      secondaryOption {
        text
        action
        link
      }
    }
  }
`;

const submitDatagridMutation = gql`
  mutation SubmitDatagridMutation($id: ID!) {
    submitDatagrid(id: $id) {
      id
    }
  }
`;

const resetDatagridMutation = gql`
  mutation ResetDatagridMutation($id: ID!) {
    resetDatagrid(id: $id) {
      id
    }
  }
`;

const mtaPartnerUserQuery = gql`
  query MtaPartnerUserQuery {
    dashboard {
      id
      isMTAPartnerUser
      company {
        id
      }
    }
  }
`;

const resetModalProps = {
  title: 'Reset Table',
  content:
    "Are you sure you want to reset this table? We'll remove the info in this table for you to start over. You will be able to manually enter the info or upload new a file.",
  submitActionText: 'Start Over',
};

const buttonKeys = {
  primary: 'primaryOption',
  secondary: 'secondaryOption',
};

class DataLayoutFooter extends React.Component<DataLayoutFooterProps, DataLayoutFooterState> {
  state = {
    isFinishLaterButtonLoading: false,
    isSubmitButtonLoading: false,
    confirmationModalInfo: {
      title: '',
      body: '',
      primaryOption: { text: '', action: '' as ModalButtonAction },
    },
  };

  createOnSubmitReset = resetDatagridMutation => async () => {
    const { datagridId } = this.props;

    const resetMutation = resetDatagridMutation({ variables: { id: datagridId } });
    const partnerQuery = getApollo().query({
      query: mtaPartnerUserQuery,
    });

    await resetMutation;

    const {
      data: {
        dashboard: { isMTAPartnerUser, company },
      },
    } = await partnerQuery;

    if (isMTAPartnerUser && company.id) {
      window.location.href = `/app/datagrid-flow/?company=${company.id}#/dataflow/${datagridId}/upload`;
    } else {
      window.location.href = `/app/datagrid-flow/#/dataflow/${datagridId}/upload`;
    }
  };

  createPrimaryOnClick = (openDialog: () => void, rowSavingPromises: Promise<any>[]) => async () => {
    this.setState({ isSubmitButtonLoading: true });

    try {
      await Promise.all(rowSavingPromises);

      const {
        data: { datagridSubmissionStatus: confirmationModalInfo },
      } = await getApollo().query({
        query: confirmationModalQuery,
        variables: {
          datagridId: this.props.datagridId,
        },
        fetchPolicy: 'network-only',
      });
      const { primaryOption, secondaryOption } = confirmationModalInfo;

      this.setState(
        {
          confirmationModalInfo: {
            title: confirmationModalInfo.title,
            body: confirmationModalInfo.body,
            primaryOption: {
              text: primaryOption.text,
              action: primaryOption.action,
              link: primaryOption.link,
            },
            secondaryOption: secondaryOption
              ? {
                  text: secondaryOption.text,
                  action: secondaryOption.action,
                  link: secondaryOption.link,
                }
              : undefined,
          },
        },
        openDialog,
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isSubmitButtonLoading: false });
    }
  };

  createCancelOnClick = (rowSavingPromises: Promise<any>[]) => async () => {
    this.setState({ isFinishLaterButtonLoading: true });

    try {
      await Promise.all(rowSavingPromises);

      const { returnUrl } = this.props;
      if (returnUrl) {
        window.location.href = returnUrl;
      } else {
        throw new Error(`"Finish Later" button doesn't have a url to redirect to.`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isFinishLaterButtonLoading: false });
    }
  };

  makeButton = (
    button: ModalButtonFromGql,
    buttonKey: ButtonKey,
    dialog: DialogProps,
    submitDatagrid: () => Promise<any>,
    submitDatagridLoading: boolean,
  ) => {
    const { startSubmitting } = this.props;
    const submitAction = 'submitDatagrid';

    return {
      text: button.text,
      mode: (buttonKey === buttonKeys.primary ? 'primary' : 'normal') as 'primary' | 'normal',
      onClick: async () => {
        const { action, link } = button;

        if (action === 'closeModal') {
          dialog.close();
        } else if (action === submitAction) {
          startSubmitting();
          await submitDatagrid();
        }
        if (link) {
          window.location.href = link;
        }
      },
      inProgress: button.action === submitAction && submitDatagridLoading,
    };
  };

  makeButtons = (dialog: DialogProps, submitDatagrid: () => Promise<any>, submitDatagridLoading: boolean) => {
    const { confirmationModalInfo } = this.state;

    return [buttonKeys.secondary, buttonKeys.primary].reduce((buttons: ModalButton[], buttonKey: ButtonKey) => {
      const button: ModalButtonFromGql = confirmationModalInfo[buttonKey];

      if (button) {
        buttons.push(this.makeButton(button, buttonKey, dialog, submitDatagrid, submitDatagridLoading));
      }

      return buttons;
    }, []);
  };

  render() {
    const { datagridId, showReset, allowSaveDraft } = this.props;
    const { isSubmitButtonLoading, isFinishLaterButtonLoading, confirmationModalInfo } = this.state;

    return (
      <Mutation<SubmitDatagridMutation.Mutation> mutation={submitDatagridMutation}>
        {(submitDatagridMutation, { loading: submitDatagridLoading, error }) => {
          if (error) {
            // TODO: submit fails
          }

          const submitDatagrid = () => {
            return submitDatagridMutation({
              variables: {
                id: datagridId,
              },
            });
          };

          return (
            <DialogsManager
              dialogsCount={2}
              render={dialogs => {
                const [submitDialog, resetDialog] = dialogs;
                const buttons: ModalButton[] = this.makeButtons(submitDialog, submitDatagrid, submitDatagridLoading);

                const submitModalProps = {
                  buttons,
                  omitCancelButton: true,
                  title: confirmationModalInfo.title,
                  content: confirmationModalInfo.body,
                  // OnSubmit is a required prop but here it's overwritten by `buttons` inside ConfirmationModal
                  onSubmit: () => {},
                  onCancel: submitDialog.close,
                  isVisible: submitDialog.isVisible,
                  controlEl: submitDialog.controlEl,
                };

                return (
                  <>
                    <ConfirmationModal {...submitModalProps} />

                    <Mutation<ResetDatagridMutation.Mutation> mutation={resetDatagridMutation}>
                      {(resetDatagridMutation, { loading: resetDatagridLoading }) => {
                        return (
                          <ConfirmationModal
                            {...resetModalProps}
                            onSubmit={this.createOnSubmitReset(resetDatagridMutation)}
                            isSubmitting={resetDatagridLoading}
                            onCancel={resetDialog.close}
                            isVisible={resetDialog.isVisible}
                            controlEl={resetDialog.controlEl}
                          />
                        );
                      }}
                    </Mutation>

                    <Flex justify="space-between" align="center">
                      {/* `showReset` check is done inside <Box> rather than outside <Box> because we have outer <Flex> with "space-between" */}
                      <Box fontStyle="paragraphs.m">{showReset && <Link onClick={resetDialog.open}>Reset</Link>}</Box>

                      <SaveStateHelpersContext.Consumer>
                        {({ getSavingPromises }) => (
                          <FormFooter
                            primaryText="Submit"
                            primaryOnClick={this.createPrimaryOnClick(submitDialog.open, getSavingPromises())}
                            primaryProps={{ inProgress: isSubmitButtonLoading }}
                            cancelShown={allowSaveDraft}
                            cancelText="Finish Later"
                            cancelOnClick={this.createCancelOnClick(getSavingPromises())}
                            cancelProps={{ inProgress: isFinishLaterButtonLoading }}
                          />
                        )}
                      </SaveStateHelpersContext.Consumer>
                    </Flex>
                  </>
                );
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default DataLayoutFooter;
