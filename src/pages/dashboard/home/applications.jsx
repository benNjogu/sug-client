import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Table, Button, Modal } from 'antd';
import { constants } from '../../../data/constants';
import ModalComponent from '../../../components/modal/modal.component';
import DefaultLayout from '../../../components/default-layout/default-layout.component';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Course',
    dataIndex: 'course',
  },
  {
    title: 'Provider',
    dataIndex: 'provider',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => (
      <div className="d-flex justify-content-around">
        <EditOutlined className="mx-2" onClick={() => console.log('edit')} />
        <DeleteOutlined
          className="mx-2"
          onClick={() => console.log('delete')}
        />
      </div>
    ),
  },
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
  {
    id: 6,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
  {
    id: 7,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Rejected',
  },
  {
    id: 8,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
  {
    id: 9,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Pending',
  },
  {
    id: 10,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
  {
    id: 11,
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
    <DefaultLayout>
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
        {/* <DetailsTable
          columns={columns}
          names={rows}
          onClick={handleApplicationClick}
        /> */}
        <Table columns={columns} dataSource={rows} />
      </div>
    </DefaultLayout>
  );
};

export default Applications;
