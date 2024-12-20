import rootReducer from "./rootReducer";
import { applyMiddleware, compose, createStore } from "redux";

const middlewares = [];

import { logger } from 'redux-logger';

middlewares.push(logger);

const combineReducers = compose(applyMiddleware(...middlewares));

const initialState = {};

const store = createStore(rootReducer, initialState, combineReducers);

export default store;
