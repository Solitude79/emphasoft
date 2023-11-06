import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { setFilterUsernames } from "../../../stores/users/actions";
import "../styles/home-filtering.css";

export const HomeFiltering = () => {
  const dispatch = useDispatch();

  // Получите значения `variables` и `checked` из Redux хранилища
  const variables = useSelector(
    (state: RootState) => state.usersState.filter.usernames.variables
  );
  const checked = useSelector(
    (state: RootState) => state.usersState.filter.usernames.checked
  );

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (event: { target: { name: string } }) => {
    const { name } = event.target;

    // Создайте копию массива `checked` или новый массив, если `checked` отсутствует
    const updatedChecked = checked ? [...checked] : [];

    // Проверьте, есть ли `name` в `updatedChecked`
    const index = updatedChecked.indexOf(name);

    if (index !== -1) {
      // Если `name` уже в `updatedChecked`, удалите его
      updatedChecked.splice(index, 1);
    } else {
      // Иначе, добавьте `name` в `updatedChecked`
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
