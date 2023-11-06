import { userLogout } from '../../../functions/axios-instance';
import { $dataToken } from '../../../functions/is-token';
import { useStore } from "effector-react";
import '../styles/app-general-header.css'

export const AppGeneralHeader = () => {
    const dataToken = useStore($dataToken);

    return (
        <div className="AppGeneralHeader">
            <div className="AppGeneralHeader__Label">
                Emphasoft
            </div>
            {dataToken? ( 
            <div className="AppGeneralHeader__LogoutButton" style={{ cursor: "pointer" }} onClick={userLogout}>
                Выйти
            </div>):(<div></div>)}
        </div>    
    );
};