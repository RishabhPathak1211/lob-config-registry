import store from "../store";
import { DefaultConfigObjectType } from "./configuration-reducer.default-value";
import { CONFIGURATION_REDUCER_ACTION_TYPES } from "./configuration.action-types";

export const setConfigurationValue = (
  configs:Record<string, Record<string, Record<string, string>>>
) => store.dispatch({
  type:CONFIGURATION_REDUCER_ACTION_TYPES.SET_CONFIG_VALUE,
  payload: {
    "configs":configs
  }
})
export const setSelectedDomain = (
  domain:string
) => store.dispatch({
  type:CONFIGURATION_REDUCER_ACTION_TYPES.SET_CURRENT_SELECTED_DOMAIN,
  payload: {
   "selectedDomain" :domain
  }
})
export const setDefaultConfigValues = (
  defaultConfigValues: DefaultConfigObjectType[]
) => store.dispatch({
  type:CONFIGURATION_REDUCER_ACTION_TYPES.SET_DEFAULT_CONFIG_VALUE,
  payload: {
   "defaultConfigValues" :defaultConfigValues
  }
})
