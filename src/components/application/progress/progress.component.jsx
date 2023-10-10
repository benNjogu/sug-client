import { Link } from 'react-router-dom';

import withRouter from '../../../hooks/withRouter';
import './progressive.styles.scss';
import { useLocation } from 'react-router-dom';

const Progress = ({}) => {
  let location = useLocation();
  let { pathname } = location;
  console.log(pathname);
  console.log(location);
  const isFirstStep = pathname === '/app/new-application';
  const isSecondStep = pathname === '/app/new-application/course';
  const isThirdStep = pathname === '/app/new-application/overseas';

  return (
    <>
      <div className="steps">
        <div className={`${isFirstStep ? 'step active' : 'step'}`}>
          <div>1</div>
          <div>
            {isSecondStep || isThirdStep ? (
              <Link to="/app/new-application">Step 1</Link>
            ) : (
              'Step 1'
            )}
          </div>
        </div>
        <div className={`${isSecondStep ? 'step active' : 'step'}`}>
          <div>2</div>
          <div>
            {isThirdStep ? (
              <Link to="/app/new-application/course">Step 2</Link>
            ) : (
              'Step 2'
            )}
          </div>
        </div>
        <div
          className={`${
            pathname === '/app/new-application/overseas'
              ? 'step active'
              : 'step'
          }`}
        >
          <div>3</div>
          <div>Step 3</div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Progress);
