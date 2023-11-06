import "../styles/home-button-add.css";

interface IHomeButtonAdd {
  setModalNewActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const HomeButtonAdd = (props: IHomeButtonAdd) => {
  return (
    <div
      className="HomeButtonAdd"
      onClick={() =>
        props.setModalNewActive((prevValue) => {
          return !prevValue;
        })
      }
    >
      Add user
    </div>
  );
};
