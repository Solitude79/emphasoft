import { $dataToken } from "../functions/is-token";
import { AppGeneral } from "./app-general/organelles/app-general";
import { Home } from "../pages/home/organelles/home";
import { Login } from "../pages/login/organelles/login";
import { pathName } from "./path-name";
import { Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "effector-react";
import "./App.css";

function App() {
  const dataToken = useStore($dataToken);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppGeneral />}>
          {dataToken ? (
            <>
              <Route
                path="*"
                element={<Navigate to={`/${pathName.home.title}`} />}
              />
              <Route path={`${pathName.home.title}`} element={<Home />} />
            </>
          ) : (
            <>
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
