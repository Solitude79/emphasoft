import { deleteUser } from "../../../stores/users/actions";
import { deleteUserId } from "../../../stores/acync-actions/delete-user-id";
import { HomeButtonAdd } from "../atoms/home-button-add";
import { useDispatch } from "react-redux";
import "../styles/home-user-list.css";
import { applyFilterAndSort } from "../../../stores/actions/apply-filter-and-sort ";
import {
  IUser,
  IUserFilter,
  IUserSort,
} from "../../../stores/users/interfaces";

interface IHomeUsersList {
  users: IUser[];
  filter: IUserFilter;
  sort: IUserSort;
  setModalNewActive: React.Dispatch<React.SetStateAction<boolean>>;
  setEditUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}
export const HomeUsersList = (props: IHomeUsersList) => {
  const dispatch = useDispatch();

  const handleClick = async (user: IUser) => {
    try {
      await deleteUserId(user);
      dispatch(deleteUser(user));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="HomeUsersList">
      {props.users ? (
        <div className="HomeUsersList__Content">
          {applyFilterAndSort(props.users, props.filter, props.sort).map(
            (user: IUser, id: number) => (
              <div className="HomeUsersList__Content__Username" key={id}>
                ID: {user.id} Username: {user.username}
                <div className="HomeUsersList__Content__Buttons">
                  <div
                    className="HomeUsersList__Content__Button"
                    onClick={() => props.setEditUser(user)}
                  >
                    Edit
                  </div>
                  <div
                    onClick={() => handleClick(user)}
                    className="HomeUsersList__Content__Button"
                  >
                    Delete
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="HomeUsersList__Error">GET_USER error</div>
      )}
      <HomeButtonAdd setModalNewActive={props.setModalNewActive} />
    </div>
  );
};
