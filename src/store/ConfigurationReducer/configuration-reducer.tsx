import { CONFIGURATION_REDUCER_ACTION_TYPES } from "./configuration.action-types";
import { CONFIGURATION_REDUCER_DEFAULT_VALUE } from "./configuration-reducer.default-value";

interface ConfigurationState {
  configs: Record<string, Record<string, Record<string, string>>>;
}

const initialState: ConfigurationState = CONFIGURATION_REDUCER_DEFAULT_VALUE;

interface ConfigurationAction {
  type: typeof CONFIGURATION_REDUCER_ACTION_TYPES[keyof typeof CONFIGURATION_REDUCER_ACTION_TYPES];
  payload: Record<string, Record<string, Record<string, string>>>;
}

export const ConfigurationReducer = (
  state: ConfigurationState = initialState,
  action: ConfigurationAction
): ConfigurationState => {
  const { type, payload } = action;

  switch (type) {
    case CONFIGURATION_REDUCER_ACTION_TYPES.SET_CONFIG_VALUE:
      return {
        ...state,
        configs: payload,
      };
    default:
      return state;
  }
};
