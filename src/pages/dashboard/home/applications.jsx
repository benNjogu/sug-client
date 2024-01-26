import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Table } from 'antd';
import { constants } from '../../../data/constants';
import ModalComponent from '../../../components/modal/modal.component';
import DefaultLayout from '../../../components/default-layout/default-layout.component';
import { FetchOrganizationApplications } from '../../../redux/slices/application';
import { addSerialNumber, status } from './../../../utils/addSerialNumber';

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { applications } = useSelector((state) => state.application);

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
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
            <EditOutlined
              className="mx-2"
              onClick={() => handleEditApplication(record)}
            />
          </div>
        ) : record.approved === 'Pending' ? (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
            <EditOutlined
              className="mx-2"
              onClick={() => handleEditApplication(record)}
            />
            <DeleteOutlined
              className="mx-2"
              onClick={() => handleDeleteApplication(record)}
            />
          </div>
        ) : (
          <div className="d-flex justify-content-around">
            <div className="mx-2" />
            <div className="mx-2" />
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ),
    },
  ];

  const handleNextClick = () => {
    navigate('/app/new-application');
  };

  const handleViewApplication = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/app/view-application', { state: { record } });
    }, 700);
  };

  const handleEditApplication = (record) => {
    console.log('edit application', record);
  };

  const handleDeleteApplication = (record) => {
    console.log('delete application', record);
  };

  useEffect(() => {
    dispatch(FetchOrganizationApplications());
  }, []);

  return (
    <DefaultLayout>
      {loading && (
        <div className="spinner">
          <div className="spinner-border" role="status" />
        </div>
      )}

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
        <Table
          columns={columns}
          dataSource={addSerialNumber(applications, status.All)}
        />
      </div>
    </DefaultLayout>
  );
};

export default Applications;
