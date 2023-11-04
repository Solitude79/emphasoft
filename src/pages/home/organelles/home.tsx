import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../functions/axios-instance";
import { getUsersApi } from "../../../stores/acync-actions/get-users-api";
import { RootState } from "../../../stores/store";
import { useEffect } from "react";
import { getUsers } from "../../../stores/users/actions";
import { IUser } from "../../../stores/users/interfaces";
import { applyFilterAndSort } from "../../../stores/actions/apply-filter-and-sort ";
import { HomeFiltering } from "../molecules/home-filtering";
import { HomeSorting } from "../molecules/home-sorting";

export const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.usersState.users);
  const sort = useSelector((state: RootState) => state.usersState.sort);
  const filter = useSelector((state: RootState) => state.usersState.filter);

  const fetchGetUsersApi = async () => {
    try {
      const result = await getUsersApi();
      if (result) dispatch(getUsers(result));
    } catch (error) {
      console.log("Ошибка вызова списка пользователей: ", error);
    }
  };

  useEffect(() => {
    fetchGetUsersApi();
  }, []);
  return (
    <div>
      Привет
      <div style={{ cursor: "pointer" }} onClick={userLogout}>
        Выйти
      </div>
      <HomeFiltering />
      <HomeSorting />
      <div>
        {users ? (
          <div>
            {applyFilterAndSort(users, filter, sort).map(
              (user: IUser, id: number) => (
                <div key={id}>{user.username}</div>
              )
            )}
          </div>
        ) : (
          <div>Нет пользователей</div>
        )}
      </div>
      <div style={{ cursor: "pointer" }}>Добавить пользователя</div>
      <div style={{ cursor: "pointer" }}>Удалить пользователя</div>
    </div>
  );
};
