import { RootState } from "../rootReducer";

export const selectConfigs = (state: RootState) => state.configurationReducer.configs;
export const selectCurrentDomain = (state: RootState) => state.configurationReducer.selectedDomain;
export const selectDefaultConfigValues = (state: RootState) => state.configurationReducer.defaultConfigValues;
