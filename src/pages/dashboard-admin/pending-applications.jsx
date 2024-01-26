import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import DefaultLayout from '../../components/default-layout/default-layout.component';
import { FetchAllApplications } from '../../redux/slices/admin';
import { getKeyByValue } from '../../utils/getObjectKey';
import { applicationWithSerialNumber } from '../../utils/applicationWithSerialNumber';

let status = {
  Rejected: -1,
  Pending: 0,
  Stage_1: 1,
  Stage_2: 2,
  Approved: 3,
};

const PendingApplications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { applications } = useSelector((state) => state.admin);
  console.log('all', applications);

  const handleViewApplication = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/app/view-application', { state: { record } });
    }, 700);
  };

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
          </div>
        ) : (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ),
    },
  ];

  useEffect(() => {
    dispatch(FetchAllApplications());
  }, []);

  return (
    <DefaultLayout>
      {loading && (
        <div className="spinner">
          <div className="spinner-border" role="status" />
        </div>
      )}

      <Table
        columns={columns}
        dataSource={applicationWithSerialNumber(applications)}
      />
    </DefaultLayout>
  );
};

export default PendingApplications;
