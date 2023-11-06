import { IUser, IUsersState } from "./interfaces";
import * as types from "./types";

const initialState: IUsersState = {
  users: [],
  filter: {
    usernames: {
      checked: null,
      variables: null,
    },
  },
  sort: {
    id: null,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const usersReducer = (state = initialState, action: any): IUsersState => {
  switch (action.type) {
    case types.CLEAR_USERS_STATE: {
      return initialState;
    }
    case types.ADD_USERS: {
      const newUniqueUsernames: string[] = Array.from(
        new Set(action.payload.map((user: IUser) => user.username))
      );

      return {
        ...state,
        users: [...state.users, ...action.payload],
        filter: {
          ...state.filter,
          usernames: {
            ...state.filter.usernames,
            variables: newUniqueUsernames,
          },
        },
      };
    }
    case types.ADD_USER: {
      const newUsername = action.payload.username;

      if (!state.filter.usernames.variables?.includes(newUsername)) {
        const uniqueUsernames = state.filter.usernames.variables
          ? [...state.filter.usernames.variables, newUsername]
          : [newUsername];

        return {
          ...state,
          users: [...state.users, action.payload],
          filter: {
            ...state.filter,
            usernames: {
              ...state.filter.usernames,
              variables: uniqueUsernames,
            },
          },
        };
      }

      return { ...state, users: [...state.users, action.payload] };
    }
    case types.DELETE_USER: {
      const userIdToDelete = action.payload;

      const userToDelete = state.users.find(
        (user) => user.id === userIdToDelete
      );

      if (userToDelete) {
        const usernameCount = state.users.filter(
          (user) => user.username === userToDelete.username
        ).length;

        if (usernameCount === 1) {
          const updatedUsernames = state.filter.usernames.variables
            ? state.filter.usernames.variables.filter(
                (username) => username !== userToDelete.username
              )
            : [];

          return {
            ...state,
            users: state.users.filter((user) => user.id !== userIdToDelete),
            filter: {
              ...state.filter,
              usernames: {
                ...state.filter.usernames,
                variables: updatedUsernames,
              },
            },
          };
        }

        return {
          ...state,
          users: state.users.filter((user) => user.id !== userIdToDelete),
        };
      }

      return state;
    }
    case types.SET_FILTER_USERNAMES: {
      return {
        ...state,
        filter: {
          ...state.filter,
          usernames: {
            ...state.filter.usernames,
            checked: action.payload.length == 0 ? null : action.payload,
          },
        },
      };
    }
    case types.SET_SORT_ID: {
      return {
        ...state,
        sort: {
          id: action.payload == state.sort.id ? null : action.payload,
        },
      };
    }
    case types.UPDATE_USER: {
      const updatedUser = action.payload;
      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      const newUniqueUsernames: string[] = Array.from(
        new Set(updatedUsers.map((user: IUser) => user.username))
      );
      return {
        ...state,
        users: [...updatedUsers],
        filter: {
          ...state.filter,
          usernames: {
            ...state.filter.usernames,
            variables: newUniqueUsernames,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
