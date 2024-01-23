import { useLocation } from 'react-router-dom';

import Nominee from '../../components/application/particulars-nominee.component';

const RegisterNominee = () => {
  const location = useLocation();
  const { nominee_id, prevPage } = location.state !== null ? location.state : 0;

  return (
    <div className="container">
      <Nominee nominee_id={nominee_id} prevPage={prevPage} />
    </div>
  );
};

export default RegisterNominee;
