import { applyMiddleware, combineReducers, createStore } from "redux";
import usersReducer from "./users/reducer";
import { IUsersState } from "./users/interfaces";
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

export interface RootState {
  //Инициализация интерфейса рут стэйта
  usersState: IUsersState;
}

const rootReducer = combineReducers({
  //Инициализация редьюсера рут стэйта
  usersState: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

export { store };

