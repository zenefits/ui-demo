const SET_SWITCHES = 'SET_SWITCHES';

export interface Switches {
  benconnect?: boolean;
  talentGoals?: boolean;
  talentBetterSyncs?: boolean;
  talent_international?: boolean;
  alwaysTrue?: boolean;
  firefly_killswitch?: boolean;
  walkme_killswitch?: boolean;
  intercom?: boolean;
  contractor_new?: boolean;
  talent_cycle_completion_charts?: boolean;
  drift_killswitch?: boolean;
  fork_trial_users_on_employee_count?: boolean;
}

interface SwitchesState {
  loaded: boolean;
  values: Switches;
}

export interface ReduxStateWithSwitches {
  switches: SwitchesState;
}

interface ActionResult {
  type: typeof SET_SWITCHES;
  payload: Switches;
}

export const setSwitchesAction = (switches: Switches): ActionResult => ({
  type: SET_SWITCHES,
  payload: switches,
});

export default function addSwitchesReducer(reducersMap: any): (typeof reducersMap) & { switches: any } {
  if (reducersMap.switches) {
    throw new Error('switches key is already defined');
  }
  const newMap = {
    ...reducersMap,
    switches: function switchesReducer(
      state: SwitchesState = { loaded: false, values: {} },
      action: ActionResult,
    ): SwitchesState {
      if (action.type === SET_SWITCHES) {
        return {
          ...state,
          loaded: true,
          values: {
            ...(action.payload || {}),
            alwaysTrue: true,
          },
        };
      }
      return state;
    },
  };
  return newMap;
}
