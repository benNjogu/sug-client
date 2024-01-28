import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';

import './navbar.styles.css';

const Button = ({ text, text_color, icon }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="nav__item nav__item-btn" onClick={handleNavigate}>
      <span className={`icon ${text_color}`}>{icon}</span>
      <a className={`${text_color}`}>{text}</a>
    </div>
  );
};

const Navbar = ({ course }) => {
  let { account_type } = useSelector((state) => state.auth).account_type;

  return (
    <nav className="nav collapsible fixed-top">
      <label className="nav__brand text-white">{course}</label>

      {account_type === process.env.REACT_APP_AccountType3 ? (
        <ul className="list nav__list collapsible__content">
          <li className="nav__item">
            <Button text={'Approve'} text_color={'text-success'} />
          </li>
          <li className="nav__item">
            <Button text={'Escalate'} text_color={'text-warning'} />
          </li>
          <li className="nav__item">
            <Button text={'Reject'} text_color={'text-danger'} />
          </li>
          <li className="nav__item">
            <Button
              text={'Back'}
              text_color={'text-danger'}
              icon={<LeftOutlined />}
              nav_route={'/rejected'}
            />
          </li>
        </ul>
      ) : (
        <ul className="list nav__list collapsible__content">
          <li className="nav__item">
            <Button
              text={'Back'}
              text_color={'text-danger'}
              icon={<LeftOutlined />}
            />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;