import { userLogout } from "../../../functions/axios-instance";

export const Home = () => {
  return (
    <div>
      Привет
      <button onClick={userLogout}>Выйти</button>
    </div>
  );
};
git init