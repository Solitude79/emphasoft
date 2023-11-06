import { $dataToken } from "../functions/is-token";
import { AppGeneral } from "./app-general/organelles/app-general";
import { Home } from "../pages/home/organelles/home";
import { IUser } from "../stores/users/interfaces";
import { Login } from "../pages/login/organelles/login";
import { Navigate, Route, Routes } from "react-router-dom";
import { pathName } from "./path-name";
import { useStore } from "effector-react";
import "./App.css";

export const DEFAULT_USER: IUser = {
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  is_active: false,
};
export const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

function App() {
  const dataToken = useStore($dataToken);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppGeneral />}>
          {dataToken ? (
            <>
              <Route
                index
                element={<Navigate to={`/${pathName.home.title}`} />}
              />
              <Route
                path="*"
                element={<Navigate to={`/${pathName.home.title}`} />}
              />
              <Route path={`${pathName.home.title}`} element={<Home />} />
            </>
          ) : (
            <>
              <Route
                index
                element={<Navigate to={`/${pathName.login.title}`} />}
              />
              <Route
                path="*"
                element={<Navigate to={`/${pathName.login.title}`} />}
              />
              <Route path={`${pathName.login.title}`} element={<Login />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
