import { House, CaretLeft } from 'phosphor-react';

const HomepageBtn = ({ onClickHome, prevPage }) => {
  return (
    <button
      className="btn btn-sm btn-outline-danger d-inline-flex align-items-center font-weight-bold"
      onClick={onClickHome}
    >
      {prevPage === 'select' ? (
        <div className="d-inline-flex align-items-center font-weight-bold">
          <CaretLeft size={16} style={{ marginRight: 4 + 'px' }} /> BACK
        </div>
      ) : (
        <div className="d-inline-flex align-items-center font-weight-bold">
          <House size={16} style={{ marginRight: 4 + 'px' }} /> HOME PAGE
        </div>
      )}
    </button>
  );
};

export default HomepageBtn;
