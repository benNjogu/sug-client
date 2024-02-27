import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import DefaultLayout from '../../components/default-layout/default-layout.component';
import { FetchAllApplications, GetAdminData } from '../../redux/slices/admin';
import { addSerialNumber, status } from './../../utils/addSerialNumber';
import { constants } from '../../data/constants';
import { convertDigitInString } from '../../utils/convertDigitsInString';

const AllApplications = () => {
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

  const getDate = (string) => {
    let date = string.split('T')[1].split(':');
    date = date[0] + ':' + date[1];

    return date;
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 's_no',
    },
    {
      title: 'Organization',
      dataIndex: 'organization_id',
    },
    {
      title: 'Date of application',
      dataIndex: 'date_applied',
      render(text, record) {
        return {
          children: (
            <div>
              {convertDigitInString(record.date_applied.split('T')[0])}
              {', '}
              {getDate(record.date_applied)}
            </div>
          ),
        };
      },
    },
    {
      title: 'Admin',
      dataIndex: 'admin_on_it',
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
        record.approved === constants.REJECTED ? (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ) : record.approved === constants.PENDING ? (
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
    dispatch(GetAdminData());
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
        dataSource={addSerialNumber(applications, status.All)}
      />
    </DefaultLayout>
  );
};

export default AllApplications;
