import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { setFilterUsernames } from "../../../stores/users/actions";
import "../styles/home-filtering.css";

export const HomeFiltering = () => {
  const dispatch = useDispatch();

  const variables = useSelector(
    (state: RootState) => state.usersState.filter.usernames.variables
  );
  const checked = useSelector(
    (state: RootState) => state.usersState.filter.usernames.checked
  );

  const handleCheckboxChange = (event: { target: { name: string } }) => {
    const { name } = event.target;

    const updatedChecked = checked ? [...checked] : [];

    const index = updatedChecked.indexOf(name);

    if (index !== -1) {
      updatedChecked.splice(index, 1);
    } else {
      updatedChecked.push(name);
    }

    dispatch(setFilterUsernames(updatedChecked));
  };
  return (
    <div className="HomeFiltering">
      <div className="HomeFiltering__Label">Filtering</div>
      {variables &&
        variables.map((variable) => (
          <div key={variable} className="HomeFiltering__Element">
            <label>
              <input
                type="checkbox"
                name={variable}
                checked={
                  checked
                    ? checked.find((element: string) => element == variable)
                      ? true
                      : false
                    : false
                }
                onChange={handleCheckboxChange}
              />
              {variable}
            </label>
          </div>
        ))}
    </div>
  );
};
