import { useSelector } from 'react-redux';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DefaultLayout from '../../../components/default-layout/default-layout.component';
import { addSerialNumber, status } from '../../../utils/addSerialNumber';
import { convertDigitInString } from './../../../utils/convertDigitsInString';
import Spinner from '../../../components/spinner';

const Approved = () => {
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
      title: 'Date Applied',
      dataIndex: 'date_applied',
      render(text, record) {
        return {
          children: <div>{convertDigitInString(text.split('T')[0])}</div>,
        };
      },
    },
    {
      title: 'Approval Letter',
      dataIndex: 'approval_letter',
      render(text, record) {
        return {
          props: {
            style: {
              color: '#1e90ff',
              fontWeight: 600,
              cursor: 'pointer',
            },
          },
          children: <div onClick={() => console.log('download')}>{text}</div>,
        };
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <EyeOutlined
            className="mx-2"
            onClick={() => handleViewApplication(record)}
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

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      <Table
        columns={columns}
        dataSource={addSerialNumber(applications, status.Approved)}
      />
    </DefaultLayout>
  );
};

export default Approved;
