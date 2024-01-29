import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

export const ConfirmModal = () => {
  return (
    <>
      <div>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </div>
    </>
  );
};
// const App = () => {
//   const [modal, contextHolder] = Modal.useModal();
//   const confirm = () => {
//     modal.confirm({
//       title: 'Confirm',
//       icon: <ExclamationCircleOutlined />,
//       content: 'Bla bla ...',
//       okText: '确认',
//       cancelText: '取消',
//     });
//   };
//   return (
//     <>
//       <Space>
//         <LocalizedModal />
//         <Button onClick={confirm}>Confirm</Button>
//       </Space>
//       {contextHolder}
//     </>
//   );
// };
// export default App;
