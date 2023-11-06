import { applyMiddleware, combineReducers, createStore } from "redux";
import usersReducer from "./users/reducer";
import { IUsersState } from "./users/interfaces";
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

export interface RootState {
  usersState: IUsersState;
}

const rootReducer = combineReducers({
  usersState: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

export { store };

