import { useNavigate } from 'react-router-dom';

import DetailsTable from './../table/details_table';
import { constants } from './../../data/constants';

const columns = [
  { path: 'id', label: 'ID' },
  { path: 'course', label: 'COURSE' },
  { path: 'provider', label: 'PROVIDER' },
  { path: 'status', label: 'STATUS' },
];

const rows = [
  {
    id: 1,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
  {
    id: 2,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Rejected',
  },
  {
    id: 3,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
  {
    id: 4,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Pending',
  },
  {
    id: 5,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
];

const Applications = () => {
  const navigate = useNavigate();
  const handleBtnClick = (e) => {
    e.preventDefault();
    navigate('/app/application');
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginBottom: 8 }}
        onClick={handleBtnClick}
      >
        {constants.NEW_APPLICATION}
      </button>
      <DetailsTable columns={columns} names={rows} />
    </div>
  );
};

export default Applications;
