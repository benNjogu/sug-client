import female from "../../assets/images/female.svg";
import male from "../../assets/images/male.svg";
import "./users-card.styles.css";

const UsersCard = ({
  btn1Text,
  btn2Text,
  btn1Click,
  btn2Click,
  deactivateBtn,
  user,
}) => {
  return (
    <div className="profile-card">
      {user.sex === "F" ? (
        <img src={female} className="profile-img" alt="passport photo" />
      ) : (
        <img src={male} className="profile-img" alt="passport photo" />
      )}
      <div className="info">
        <h1>{user.first_name}</h1>
        <p>{user.user_name}</p>
        <ul>
          <li>{user.idNumber ? user.idNumber : user.email}</li>
          <li>{user.email ? "" : user.phone}</li>
        </ul>
        <div className="btns">
          <button
            className="btn btn-sm btn-success mr-4"
            onClick={() => btn1Click(user)}
          >
            {btn1Text}
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => btn2Click(user.id)}
            disabled={deactivateBtn || !user.active}
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
