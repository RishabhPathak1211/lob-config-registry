export const CONFIGURATION_REDUCER_ACTION_TYPES = {
    SET_CONFIG_VALUE: "SET_CONFIG_VALUE",
  } as const;
  
  export type ConfigurationActionTypes =
    typeof CONFIGURATION_REDUCER_ACTION_TYPES[keyof typeof CONFIGURATION_REDUCER_ACTION_TYPES];
  