import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import DefaultLayout from '../../../components/default-layout/default-layout.component';
import { addSerialNumber, status } from './../../../utils/addSerialNumber';
import Spinner from '../../../components/spinner';

const DefferedApplications = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      title: 'Reason',
      dataIndex: 'reason',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id, record) => (
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
      ),
    },
  ];

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

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      <Table
        columns={columns}
        dataSource={addSerialNumber(applications, status.Rejected)}
      />
    </DefaultLayout>
  );
};

export default DefferedApplications;
