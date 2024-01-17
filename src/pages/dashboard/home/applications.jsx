import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Table } from 'antd';
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
    dataIndex: 'approved',
    render(text, record) {
      return {
        props: {
          style: {
            color:
              record.approved === 'Rejected'
                ? 'red'
                : record.approved === 'Stage_1'
                ? '#98FB98'
                : record.approved === 'Stage_2'
                ? '#32CD32'
                : record.approved === 'Approved'
                ? '	#008000'
                : '',
            fontWeight: 600,
          },
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) =>
      record.approved === 'Rejected' ? (
        <div className="d-flex justify-content-around">
          <div className="mx-2" />
          <EyeOutlined className="mx-2" onClick={() => console.log('eye')} />
          <EditOutlined className="mx-2" onClick={() => console.log('eye')} />
        </div>
      ) : record.approved === 'Pending' ? (
        <div className="d-flex justify-content-around">
          <EyeOutlined className="mx-2" onClick={() => console.log('eye')} />
          <EditOutlined className="mx-2" onClick={() => console.log('eye')} />
          <DeleteOutlined
            className="mx-2"
            onClick={() => console.log('r', record.approved)}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-around">
          <div className="mx-2" />
          <div className="mx-2" />
          <EyeOutlined className="mx-2" onClick={() => console.log('eye')} />
        </div>
      ),
  },
];

let status = {
  Rejected: -1,
  Pending: 0,
  Stage_1: 1,
  Stage_2: 2,
  Approved: 3,
};

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.application);
  let application_with_serials = [];

  const getKeyByValue = (object, value) =>
    Object.keys(object).find((key) => object[key] === value);

  let num = 0;
  applications.forEach((application) => {
    num = num + 1;
    application_with_serials.push({
      ...application,
      approved: getKeyByValue(status, application.approved),
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
