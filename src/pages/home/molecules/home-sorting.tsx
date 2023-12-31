import React from "react";
import { IUserSortID, UserSortIDList } from "../../../stores/users/interfaces";
import { RootState } from "../../../stores/store";
import { setSortId } from "../../../stores/users/actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/home-sorting.css"

export const HomeSorting = () => {
  const sort = useSelector((state: RootState) => state.usersState.sort);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const key = name as IUserSortID;
    dispatch(setSortId(key));
  };

  return (
    <div className="HomeSorting">
      <div className="HomeSorting__Label">Sorting</div>
      <div className="HomeSorting__Elements">
        {Object.keys(UserSortIDList).map((variable) => {
          const key = variable as IUserSortID;
          return (      
            <label key={variable} className="HomeSorting__Element">
              <input
                type="checkbox"
                name={key}
                checked={key === sort.id}
                onChange={handleCheckboxChange}
              />
              <span style={{ color: UserSortIDList[key].color }}>{key}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
