export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login: string | null;
  is_superuser: boolean;
}

export const UserSortIDList = {
  down: { color: "#1AD698" },
  up: { color: "#4339F2" },
} as const;

export type IUserSortID = keyof typeof UserSortIDList;

export interface IUserSort {
  id: IUserSortID | null;
}

export interface IUserFilter {
  usernames: {
    checked: string[] | null;
    variables: string[] | null;
  };
}
export interface IUsersState {
  users: IUser[];
  filter: IUserFilter;
  sort: IUserSort;
}
