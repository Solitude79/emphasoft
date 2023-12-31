import "../styles/login.css";
import { useEffect, useState } from "react";
import {
  ILoginUser,
  postUserLogin,
} from "../../../stores/acync-actions/post-user-login";
import { changeAccessTokenToLocalStorage } from "../../../functions/local-storage";
import { DEFAULT_IS_TOKEN, setDataToken } from "../../../functions/is-token";

export const Login = () => {
  const DEFAUL_LOGIN_VALUE: ILoginUser = {
    username: "test_super",
    password: "Nf<U4f<rDbtDxAPn",
  };
  const [loginValue, setLoginValue] = useState<ILoginUser>(DEFAUL_LOGIN_VALUE);
  const handleClick = async () => {
    try {
      const result = await postUserLogin(loginValue);
      if (result) {
        changeAccessTokenToLocalStorage(result);
        setDataToken(result);
      }
    } catch (error) {
      setDataToken(DEFAULT_IS_TOKEN);
    }
  };
  useEffect(() => {
    return () => {
      setLoginValue(DEFAUL_LOGIN_VALUE);
    };
  }, []);
  return (
    <div className="Login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        className="Login__Form"
      >
        <div className="Login__Form__Label">Log in</div>
        <input
          type="text"
          className="Login__Form__Input"
          required
          value={loginValue.username}
          placeholder="Username"
          onChange={(event) => {
            setLoginValue({ ...loginValue, username: event.target.value });
          }}
        />
        <input
          type="password"
          className="Login__Form__Input"
          required
          minLength={8}
          value={loginValue.password}
          placeholder="Password"
          onChange={(event) => {
            setLoginValue({ ...loginValue, password: event.target.value });
          }}
        />
        <input type="submit" className="Login__Form__Submit" value="Let's go" />
      </form>
    </div>
  );
};
