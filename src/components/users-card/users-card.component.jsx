import './users-card.styles.css';

const UsersCard = ({ btn1Text, btn2Text, nominee, onView, onDisable }) => {
  return (
    <div className="profile-card">
      {nominee.sex === 'F' ? (
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
        <h1>{nominee.first_name}</h1>
        <p>{nominee.organization}</p>
        <ul>
          <li>{nominee.idNumber}</li>
          <li>{nominee.phone}</li>
        </ul>
        <div className="btns">
          <button className="btn btn-sm btn-success" onClick={onView}>
            {btn1Text}
          </button>
          <button className="btn btn-sm btn-danger" onClick={onDisable}>
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
