import { combineReducers } from "redux";
import { ConfigurationReducer } from "./ConfigurationReducer/configuration-reducer";

const rootReducer = combineReducers({
  configurationReducer: ConfigurationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
