import * as types from "./types";
import { IUserSortID, IUser } from "./interfaces";

export const getUsers = (users: IUser) => ({
  type: types.ADD_USERS,
  payload: users,
});

export const addUser = (user: IUser) => ({
  type: types.ADD_USER,
  payload: user,
});

export const updateUser = (user: IUser[]) => ({
  type: types.UPDATE_USER,
  payload: user,
});

export const patchUser = (user: IUser) => ({
  type: types.PATCH_USER,
  payload: user,
});

export const deleteUSer = (user: IUser) => ({
  type: types.DELETE_USER,
  payload: user.id,
});
export const setFilterUsernames = (usernames: string[]) => ({
  type: "SET_FILTER_USERNAMES",
  payload: usernames,
});

export const setSortId = (sort: IUserSortID) => ({
  type: "SET_SORT_ID",
  payload: sort,
});
