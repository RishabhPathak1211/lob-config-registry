import { CONFIGURATION_REDUCER_ACTION_TYPES } from "./configuration.action-types";
import { CONFIGURATION_REDUCER_DEFAULT_VALUE } from "./configuration-reducer.default-value";

interface ConfigurationState {
  configs: Record<string, Record<string, Record<string, string>>>,
  selectedDomain: string
}

const initialState: ConfigurationState = CONFIGURATION_REDUCER_DEFAULT_VALUE;

// Define payload types for actions
interface SetConfigValuePayload {
  configs: Record<string, Record<string, Record<string, string>>>
}

interface SetCurrentSelectedDomainPayload {
  selectedDomain: string
}

// Define the action types (using a union type for payload)
type ConfigurationAction = 
  | { type: typeof CONFIGURATION_REDUCER_ACTION_TYPES.SET_CONFIG_VALUE, payload: SetConfigValuePayload }
  | { type: typeof CONFIGURATION_REDUCER_ACTION_TYPES.SET_CURRENT_SELECTED_DOMAIN, payload: SetCurrentSelectedDomainPayload };

export const ConfigurationReducer = (
  state: ConfigurationState = initialState,
  action: ConfigurationAction
): ConfigurationState => {
  const { type, payload } = action;

  switch (type) {
    case CONFIGURATION_REDUCER_ACTION_TYPES.SET_CONFIG_VALUE:
      // Here, TypeScript knows that payload is of type SetConfigValuePayload, so `payload.configs` is valid
      return {
        ...state,
        configs: payload.configs,
      };
    case CONFIGURATION_REDUCER_ACTION_TYPES.SET_CURRENT_SELECTED_DOMAIN:
      // Here, TypeScript knows that payload is of type SetCurrentSelectedDomainPayload, so `payload.selectedDomain` is valid
      return {
        ...state,
        selectedDomain: payload.selectedDomain,
      };
    default:
      return state;
  }
};
