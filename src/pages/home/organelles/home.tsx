import { addUsers, clearUsersState } from "../../../stores/users/actions";
import { getUsersApi } from "../../../stores/acync-actions/get-users-api";
import { HomeFiltering } from "../molecules/home-filtering";
import { HomeSorting } from "../molecules/home-sorting";
import { HomeUsersList } from "../molecules/home-user-list";
import { IUser } from "../../../stores/users/interfaces";
import { ModalEditUser } from "../../../modules/modal-edit-user/organelles/modal-edit-user";
import { ModalNewUser } from "../../../modules/modal-new-user/organelles/modal-new-user";
import { RootState } from "../../../stores/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/home.css";

export const Home = () => {
  const [modalNewActive, setModalNewActive] = useState(false);
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.usersState.users);
  const sort = useSelector((state: RootState) => state.usersState.sort);
  const filter = useSelector((state: RootState) => state.usersState.filter);

  const fetchGetUsersApi = async () => {
    try {
      const result = await getUsersApi();
      if (result) dispatch(addUsers(result));
    } catch (error) {
      console.log("Ошибка вызова списка пользователей: ", error);
    }
  };

  useEffect(() => {
    fetchGetUsersApi();
    return () => {
      dispatch(clearUsersState());
    };
  }, []);
  return (
    <div className="Home">
      <div className="Home__FilterandSorting">
        <div className="Home__FilterandSorting__Sorting">
          <HomeSorting />
        </div>
        <div className="Home__FilterandSorting__Filtering">
          <HomeFiltering />
        </div>
      </div>
      <HomeUsersList
        users={users}
        filter={filter}
        sort={sort}
        setModalNewActive={setModalNewActive}
        setEditUser={setEditUser}
      />
      {modalNewActive && (
        <ModalNewUser active={modalNewActive} setActive={setModalNewActive} />
      )}
      {editUser && (
        <ModalEditUser setEditUser={setEditUser} editUser={editUser} />
      )}
    </div>
  );
};
