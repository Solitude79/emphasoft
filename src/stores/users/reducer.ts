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
    case types.ADD_USERS: {
      // Извлекаем уникальные usernames из новых пользователей
      const newUniqueUsernames: string[] = Array.from(
        new Set(action.payload.map((user: IUser) => user.username))
      );

      // Обновляем состояние с учетом новых пользователей и usernames
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
      // Извлекаем username нового пользователя
      const newUsername = action.payload.username;

      // Проверяем, что новый username уникален в массиве usernames, иначе добавляем его
      if (!state.filter.usernames.variables?.includes(newUsername)) {
        const uniqueUsernames = state.filter.usernames.variables
          ? [...state.filter.usernames.variables, newUsername]
          : [newUsername];

        // Обновляем состояние с учетом нового пользователя и уникальных usernames
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

      // Если username уже существует в usernames, добавляем пользователя в users без изменения usernames
      return { ...state, users: [...state.users, action.payload] };
    }
    case types.DELETE_USER: {
      // Извлекаем id пользователя, которого нужно удалить
      const userIdToDelete = action.payload;

      // Находим пользователя по id
      const userToDelete = state.users.find(
        (user) => user.id === userIdToDelete
      );

      if (userToDelete) {
        // Проверяем, сколько раз `username` встречается в массиве `users`
        const usernameCount = state.users.filter(
          (user) => user.username === userToDelete.username
        ).length;

        // Если `username` существует и встречается только один раз, удаляем его из `usernames`
        if (usernameCount === 1) {
          const updatedUsernames = state.filter.usernames.variables
            ? state.filter.usernames.variables.filter(
                (username) => username !== userToDelete.username
              )
            : [];

          // Обновляем состояние без учета удаленного пользователя и обновленных usernames
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

        // В противном случае просто удаляем пользователя из массива `users`
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
    case types.PATCH_USER: {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
