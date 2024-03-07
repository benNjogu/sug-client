import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Modal, Table } from 'antd';
import { constants } from '../../../data/constants';
import DefaultLayout from '../../../components/default-layout/default-layout.component';
import { FetchOrganizationApplications } from '../../../redux/slices/application';
import { addSerialNumber, status } from '../../../utils/addSerialNumber';
import Spinner from '../../../components/spinner';
import NewApplicationModal from '../../../components/modal/new-application-modal.component';

import './applications.styles.css';
import { GetOrganizationData } from '../../../redux/slices/organization';

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { applications } = useSelector((state) => state.application);
  const [showModal, setShowModal] = useState(false);

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
                record.approved === constants.REJECTED
                  ? 'red'
                  : record.approved === constants.STAGE_1
                  ? '#32CD32'
                  : record.approved === constants.APPROVED
                  ? '	#008000'
                  : record.approved === constants.DEFFERED
                  ? '	#FFC107'
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
            <div className="mx-2" />
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
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
        ) : record.approved === 'Deffered' ? (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
            <EditOutlined
              className="mx-2"
              onClick={() => handleEditApplication(record)}
            />
            <div className="mx-2" />
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
    setShowModal(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/app/new-application');
    }, 800);
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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(FetchOrganizationApplications());
    dispatch(GetOrganizationData());
  }, []);

  return (
    <DefaultLayout>
      <Spinner loading={loading} />

      <div>
        <button
          className="btn btn-primary"
          style={{ marginBottom: 12 }}
          onClick={handleShowModal}
        >
          {constants.NEW_APPLICATION}
        </button>
        {showModal && (
          <Modal
            open={showModal}
            title={`Select appropriately`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <NewApplicationModal
                handleClose={handleCancel}
                onClick={handleNextClick}
              />
            }
          </Modal>
        )}
        <Table
          columns={columns}
          dataSource={addSerialNumber(applications, status.All)}
        />
      </div>
    </DefaultLayout>
  );
};

export default Applications;
