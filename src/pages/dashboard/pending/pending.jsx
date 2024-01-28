import { useSelector } from 'react-redux';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Table } from 'antd';
import DefaultLayout from '../../../components/default-layout/default-layout.component';
import { addSerialNumber, status } from '../../../utils/addSerialNumber';
import { convertDigitInString } from '../../../utils/convertDigitsInString';

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
    title: 'Date Applied',
    dataIndex: 'date_applied',
    render(text, record) {
      return {
        children: <div>{convertDigitInString(text.split('T')[0])}</div>,
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

const Pending = () => {
  const { applications } = useSelector((state) => state.application);

  return (
    <DefaultLayout>
      <Table
        columns={columns}
        dataSource={addSerialNumber(applications, status.Pending)}
      />
    </DefaultLayout>
  );
};

export default Pending;
