import { useSelector } from 'react-redux';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Table } from 'antd';
import DefaultLayout from '../../../components/default-layout/default-layout.component';

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

const Rejected = () => {
  const { applications } = useSelector((state) => state.application);
  let application_with_serials = [];

  const getKeyByValue = (object, value) =>
    Object.keys(object).find((key) => object[key] === value);

  let num = 0;
  applications.forEach((application) => {
    if (application.approved === -1) {
      num = num + 1;
      application_with_serials.push({
        ...application,
        approved: getKeyByValue(status, application.approved),
        s_no: num,
      });
    }
  });

  return <Table columns={columns} dataSource={application_with_serials} />;
};

export default Rejected;
