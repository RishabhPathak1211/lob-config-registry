import { RootState } from "../rootReducer";

export const selectConfigs = (state: RootState) => state.configurationReducer.configs;
