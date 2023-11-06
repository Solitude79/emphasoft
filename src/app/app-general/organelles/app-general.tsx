import { Outlet } from "react-router-dom";
import { AppGeneralHeader } from "../molecules/app-general-header";


import '../styles/app-general.css'
export const AppGeneral = () => {
    return (
        <div className="AppGeneral">
            <div className="AppGeneral__AppGeneralHeader">
                <AppGeneralHeader/>
            </div>
            <div className="AppGeneral__Outlet">
              <Outlet/>
            </div>
        </div>
    );
};