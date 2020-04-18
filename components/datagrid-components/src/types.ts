export type SystemValue = {
  value?: string;
  label: string;
};

export type SelectColumnIdMap = { [columnId: string]: SystemValue[] };

export type ComponentDescription = { name: string; props?: any; emptyValue?: any };

export type ModalButtonAction = 'submitDatagrid' | 'closeModal' | '';

export type ModalButton = {
  text: string;
  action: ModalButtonAction;
  link?: string;
};

export type ConfirmationModalInfo = {
  title: string;
  body: string;
  primaryOption: ModalButton;
  secondaryOption?: ModalButton;
};

export type ButtonKey = 'primaryOption' | 'secondaryOption';

export type Filter = {
  label: string;
  dataKey: string;
};
