import { useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';

import './navbar.styles.css';

const Button = ({ text, text_color, icon, handleBtnClick }) => {
  return (
    <div className="nav__item nav__item-btn" onClick={handleBtnClick}>
      <span className={`icon ${text_color}`}>{icon}</span>
      <a className={`${text_color}`}>{text}</a>
    </div>
  );
};

const Navbar = ({
  title,
  handleApprove,
  handleDeffer,
  handleReject,
  handleBackpressed,
}) => {
  const { account_type } = useSelector((state) => state.auth.user_data);

  return (
    <nav className="nav collapsible fixed-top">
      <label className="nav__brand text-white">{title}</label>

      {account_type === process.env.REACT_APP_AccountType7 ? (
        <ul className="list nav__list collapsible__content">
          <li className="nav__item">
            <Button
              text={'Approve'}
              text_color={'text-success'}
              handleBtnClick={handleApprove}
            />
          </li>
          <li className="nav__item">
            <Button
              text={'Deffer'}
              text_color={'text-warning'}
              handleBtnClick={handleDeffer}
            />
          </li>
          <li className="nav__item">
            <Button
              text={'Reject'}
              text_color={'text-danger'}
              handleBtnClick={handleReject}
            />
          </li>
          <li className="nav__item">
            <Button
              text={'Back'}
              text_color={'text-danger'}
              icon={<LeftOutlined />}
              handleBtnClick={handleBackpressed}
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
              handleBtnClick={handleBackpressed}
            />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
