import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

import { Table, Button, Modal } from 'antd';
import { constants } from '../../../data/constants';
import ModalComponent from '../../../components/modal/modal.component';
import DefaultLayout from '../../../components/default-layout/default-layout.component';
import { FetchAllApplications } from '../../../redux/slices/application';

const columns = [
  {
    title: 'S.No',
    dataIndex: 's_no',
  },
  {
    title: 'Course',
    dataIndex: 'course_title',
  },
  {
    title: 'Provider',
    dataIndex: 'training_provider',
  },
  {
    title: 'Status',
    dataIndex: '',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => (
      <div className="d-flex justify-content-around">
        <EyeOutlined className="mx-2" onClick={() => console.log('eye')} />
      </div>
    ),
  },
];

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.application);
  let application_with_serials = [];

  let num = 0;
  applications.forEach((application) => {
    num = num + 1;
    application_with_serials.push({
      ...application,
      s_no: num,
    });
  });

  const handleNextClick = () => {
    navigate('/app/new-application');
  };

  const handleApplicationClick = (e) => {
    e.preventDefault();
    navigate('/app/view-application');
  };

  useEffect(() => {
    dispatch(FetchAllApplications());
  }, []);

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
        <Table columns={columns} dataSource={application_with_serials} />
      </div>
    </DefaultLayout>
  );
};

export default Applications;
