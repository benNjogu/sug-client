import { House } from 'phosphor-react';

const HomepageBtn = ({ onClickHome }) => {
  return (
    <button
      className="btn btn-sm btn-outline-danger d-inline-flex align-items-center font-weight-bold"
      onClick={onClickHome}
    >
      <House size={16} style={{ marginRight: 4 + 'px' }} /> HOME PAGE
    </button>
  );
};

export default HomepageBtn;
