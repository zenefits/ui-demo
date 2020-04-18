export namespace FlowQuery {
  export type Variables = {
    flowId: string;
  };
  export type Query = {
    flow?: Flow | null;
  };
  export type Flow = WizardFlowFragment.Fragment;
}

export namespace WizardFlowFragment {
  export type Fragment = {
    flowId?: string | null;
    isComplete?: boolean | null;
    isActive?: boolean | null;
    dispatcherArgs?: string | null;
    version_id?: number | null;
    resource_uri?: string | null;
    sections?: Sections[] | null;
  };
  export type Sections = {
    id?: string | null;
    isReady?: boolean | null;
    isEntered?: boolean | null;
    isComplete?: boolean | null;
    isActive?: boolean | null;
    index?: number | null;
    name?: string | null;
    dispatcherArgs?: string | null;
    resource_uri?: string | null;
    errors?: Errors[] | null;
  };
  export type Errors = {
    id?: string | null;
    code?: string | null;
    reasonCode?: string | null;
  };
}

export namespace UpdateFlowSection {
  export type Variables = {
    flowSectionId: string;
    flowSectionUpdate: FlowSectionUpdate;
  };
  export type Mutation = {
    updateFlowSection?: UpdateFlowSection | null;
  };
  export type UpdateFlowSection = {
    id?: string | null;
  };
}
