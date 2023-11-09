import { useLocation, useParams } from 'react-router-dom';

import Nominee from '../../components/application/particulars-nominee.component';

const RegisterNominee = () => {
  const location = useLocation();
  const { nominee_id } = location.state !== null ? location.state : 0;

  return (
    <div className="container">
      <Nominee nominee_id={nominee_id} />
    </div>
  );
};

export default RegisterNominee;