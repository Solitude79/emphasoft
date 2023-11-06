import { useEffect, useState } from "react";
import "../styles/modal-edit-user.css";
import { useDispatch } from "react-redux";
import { putUserEdit } from "../../../stores/acync-actions/put-user-edit";
import { IUser } from "../../../stores/users/interfaces";
import { DEFAULT_USER, PASSWORD_PATTERN } from "../../../app/app";
import { updateUser } from "../../../stores/users/actions";
interface IModalEditUser {
  setEditUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  editUser: IUser | null;
}
export const ModalEditUser = (props: IModalEditUser) => {
  const dispatch = useDispatch();
  const [userValue, setUserValue] = useState<IUser>(DEFAULT_USER);

  useEffect(() => {
    if (props.editUser) setUserValue(props.editUser);
  }, [props.editUser]);

  const handleClick = async () => {
    try {
      if (!userValue.password || PASSWORD_PATTERN.test(userValue.password)) {
        const result = await putUserEdit(userValue);
        if (result) {
          dispatch(updateUser(result));
          props.setEditUser(null);
        }
      } else {
        alert(
          "Пароль должен содержать минимум 8 символов, одну заглавную букву и 1 цифру"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ModalNewUser" onClick={() => props.setEditUser(null)}>
      <div
        className="ModalEditUser__Content"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
          className="ModalEditUser__Content__AddUser__Form"
        >
          <div className="ModalEditUser__Content__AddUser__Form__Label">
            Edit this user
          </div>
          <input
            type="text"
            className="ModalEditUser__Content__AddUser__Form__Input"
            required
            value={userValue?.username || ""}
            maxLength={20}
            placeholder="Username"
            onChange={(event) => {
              setUserValue((prevState) => {
                return { ...prevState, username: event.target.value };
              });
            }}
          />
          <input
            type="text"
            className="ModalEditUser__Content__AddUser__Form__Input"
            value={userValue?.first_name || ""}
            maxLength={20}
            placeholder="First Name"
            onChange={(event) => {
              setUserValue((prevState) => {
                return { ...prevState, first_name: event.target.value };
              });
            }}
          />
          <input
            type="text"
            className="ModalEditUser__Content__AddUser__Form__Input"
            value={userValue?.last_name || ""}
            maxLength={20}
            placeholder="Last Name"
            onChange={(event) => {
              setUserValue((prevState) => {
                return { ...prevState, last_name: event.target.value };
              });
            }}
          />
          <input
            type="password"
            className="ModalEditUser__Content__AddUser__Form__Input"
            minLength={8}
            value={userValue.password || ""}
            placeholder="Password"
            onChange={(event) => {
              setUserValue((prevState) => {
                return { ...prevState, password: event.target.value };
              });
            }}
          />
          <div className="ModalEditUser__Content__AddUser__Form__Checkbox">
            <div className="ModalEditUser__Content__AddUser__Form__Checkbox__Label">
              Is active?
            </div>
            <input
              type="checkbox"
              className="ModalEditUser__Content__AddUser__Form__Checkbox__Input"
              checked={userValue.is_active || false}
              placeholder="is_active"
              onChange={() => {
                setUserValue((prevState) => {
                  return { ...prevState, is_active: !prevState.is_active };
                });
              }}
            />
          </div>
          <input
            type="submit"
            className="ModalEditUser__Form__Submit"
            value="Edit user"
          />
        </form>
      </div>
    </div>
  );
};
