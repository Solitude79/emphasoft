import { addUser } from "../../../stores/users/actions";
import { DEFAULT_USER, PASSWORD_PATTERN } from "../../../app/app";
import { IUser } from "../../../stores/users/interfaces";
import { postUserNew } from "../../../stores/acync-actions/post-user-new";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/modal-new-user.css";

interface IModalNewUser {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}
export const ModalNewUser = (props: IModalNewUser) => {
  const [userValue, setUserValue] = useState<IUser>(DEFAULT_USER);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      if (PASSWORD_PATTERN.test(userValue.password)) {
        const result = await postUserNew(userValue);
        if (result) dispatch(addUser(result));
      } else {
        alert(
          "Пароль должен содержать минимум 8 символов, одну заглавную букву и 1 цифру"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setUserValue(DEFAULT_USER);
    };
  }, []);
  return (
    <div
      className={"ModalNewUser"}
      onClick={() =>
        props.setActive((prevValue) => {
          return !prevValue;
        })
      }
    >
      <div
        className="ModalNewUser__Content"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
          className="ModalNewUser__Content__AddUser__Form"
        >
          <div className="ModalNewUser__Content__AddUser__Form__Label">
            What's new user?
          </div>
          <input
            type="text"
            className="ModalNewUser__Content__AddUser__Form__Input"
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
            className="ModalNewUser__Content__AddUser__Form__Input"
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
            className="ModalNewUser__Content__AddUser__Form__Input"
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
            className="ModalNewUser__Content__AddUser__Form__Input"
            required
            minLength={8}
            value={userValue.password || ""}
            placeholder="Password"
            onChange={(event) => {
              setUserValue((prevState) => {
                return { ...prevState, password: event.target.value };
              });
            }}
          />
          <div className="ModalNewUser__Content__AddUser__Form__Checkbox">
            <div className="ModalNewUser__Content__AddUser__Form__Checkbox__Label">
              Is active?
            </div>
            <input
              type="checkbox"
              className="ModalNewUser__Content__AddUser__Form__Checkbox__Input"
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
            className="ModalNewUser__Form__Submit"
            value="Add user"
          />
        </form>
      </div>
    </div>
  );
};
