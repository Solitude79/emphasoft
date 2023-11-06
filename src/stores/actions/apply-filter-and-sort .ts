import { IUser, IUserFilter, IUserSort } from "../users/interfaces";

export const applyFilterAndSort = (
  data: IUser[],
  filter: IUserFilter,
  sort: IUserSort
) => {
  let filteredAndSortedData = [...data];

  if (filter.usernames.checked !== null) {
    filteredAndSortedData = filteredAndSortedData.filter(
      (user) =>
        filter.usernames.checked !== null &&
        filter.usernames.checked.includes(user.username)
    );
  }

  if (sort.id === "up") {
    filteredAndSortedData.sort((a, b) => a.id - b.id);
  } else if (sort.id === "down") {
    filteredAndSortedData.sort((a, b) => b.id - a.id);
  }

  return filteredAndSortedData;
};
