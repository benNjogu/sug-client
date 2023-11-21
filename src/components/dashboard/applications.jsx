import { useNavigate } from 'react-router-dom';

import DetailsTable from '../table/details_table';
import { constants } from '../../data/constants';
import ModalComponent from '../modal/modal.component';

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

  const handleNextClick = () => {
    navigate('/app/new-application');
  };

  const handleApplicationClick = (e) => {
    e.preventDefault();
    navigate('/app/view-application');
  };

  return (
    <div>
      <ModalComponent onClick={handleNextClick} />
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginBottom: 8 }}
        data-toggle="modal"
        data-target="#selectItemModal"
      >
        {constants.NEW_APPLICATION}
      </button>
      <DetailsTable
        columns={columns}
        names={rows}
        onClick={handleApplicationClick}
      />
    </div>
  );
};

export default Applications;
