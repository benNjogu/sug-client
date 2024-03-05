import './users-card.styles.css';

const UsersCard = ({ btn1Text, btn2Text, btn1Click, btn2Click, user }) => {
  return (
    <div className="profile-card">
      {user.sex === 'F' ? (
        <img
          src={require('../../assets/images/female.jpg')}
          className="profile-img"
          alt="passport photo"
        />
      ) : (
        <img
          src={require('../../assets/images/male.png')}
          className="profile-img"
          alt="passport photo"
        />
      )}
      <div className="info">
        <h1>{user.first_name}</h1>
        <p>{user.organization}</p>
        <ul>
          <li>{user.idNumber}</li>
          <li>{user.phone}</li>
        </ul>
        <div className="btns">
          <button className="btn btn-sm btn-success" onClick={btn1Click}>
            {btn1Text}
          </button>
          <button className="btn btn-sm btn-danger" onClick={btn2Click}>
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
