import store from "../store";
import { CONFIGURATION_REDUCER_ACTION_TYPES } from "./configuration.action-types";

export const setConfigurationValue = (
  configs:Record<string, Record<string, Record<string, string>>>
) => store.dispatch({
  type:CONFIGURATION_REDUCER_ACTION_TYPES.SET_CONFIG_VALUE,
  payload:configs
})