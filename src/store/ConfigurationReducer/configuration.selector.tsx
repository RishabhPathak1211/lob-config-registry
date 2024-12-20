import { RootState } from "../rootReducer";

export const selectConfigs = (state: RootState) => state.configurationReducer.configs;
export const selectCurrentDomain = (state: RootState) => state.configurationReducer.selectedDomain;
