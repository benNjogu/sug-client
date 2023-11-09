import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import withRouter from '../../../hooks/withRouter';
import './progressive.styles.scss';
import HomepageBtn from '../homepage-btn';

const Progress = ({}) => {
  const navigate = useNavigate();
  let location = useLocation();
  let { pathname } = location;
  const isFirstStep = pathname === '/app/new-application';
  const isSecondStep = pathname === '/app/new-application/course';
  const isThirdStep = pathname === '/app/new-application/overseas';
  const isForthStep = pathname === '/app/new-application/training-expenses';
  const isFifthStep = pathname === '/app/new-application/declaration';

  const handleHomePage = () => {
    navigate('/app');
  };

  return (
    <>
      <div className="steps fixed-top">
        <div className={`${isFirstStep ? 'step active' : 'step'}`}>
          <div>1</div>
          <div>
            {isSecondStep || isThirdStep || isForthStep || isFifthStep ? (
              <Link to="/app/new-application">Nominee</Link>
            ) : (
              'Nominee(s)'
            )}
          </div>
        </div>
        <div className={`${isSecondStep ? 'step active' : 'step'}`}>
          <div>2</div>
          <div>
            {isThirdStep || isForthStep || isFifthStep ? (
              <Link to="/app/new-application/course">Course</Link>
            ) : (
              'Course'
            )}
          </div>
        </div>
        <div className={`${isThirdStep ? 'step active' : 'step'}`}>
          <div>3</div>
          <div>
            {isForthStep || isFifthStep ? (
              <Link to="/app/new-application/overseas">Overseas</Link>
            ) : (
              'Overseas'
            )}
          </div>
        </div>
        <div className={`${isForthStep ? 'step active' : 'step'}`}>
          <div>4</div>
          <div>
            {isFifthStep ? (
              <Link to="/app/new-application/training-expenses">Expenses</Link>
            ) : (
              'Expenses'
            )}
          </div>
        </div>
        <div
          className={`${
            pathname === '/app/new-application/declaration'
              ? 'step active'
              : 'step'
          }`}
        >
          <div>5</div>
          <div>Declaration</div>
        </div>
        <div style={{ paddingTop: 8 + 'px' }}>
          <HomepageBtn onClickHome={handleHomePage} />
        </div>
      </div>
    </>
  );
};

export default withRouter(Progress);
