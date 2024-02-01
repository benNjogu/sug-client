import { useState } from 'react';
import { Modal } from 'antd';

import DefaultLayout from '../../components/default-layout/default-layout.component';
import FilterNominees from '../../components/filter-component';
import AddAdminModal from '../../components/modal/add-admin-modal.component';

const CreateAdmin = () => {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  let type_of_admins = [
    'All',
    'Super Admin',
    'Admin I',
    'Admin II',
    'Admin III',
    'Admin I&II&III',
  ];

  const handleAddNew = () => {
    setShowAddAdminModal(true);
  };

  const handleAddAdmin = () => {
    // setShowAddAdminModal(true);
  };

  const handleCancel = () => {
    setShowAddAdminModal(false);
  };

  return (
    <DefaultLayout>
      {showAddAdminModal && (
        <Modal
          open={showAddAdminModal}
          title={`New Admin`}
          onCancel={handleCancel}
          footer={false}
        >
          {
            <AddAdminModal
              handleClose={handleCancel}
              handleAddAdmin={handleAddAdmin}
              options={type_of_admins}
            />
          }
        </Modal>
      )}
      <FilterNominees onAddNew={handleAddNew} options={type_of_admins} />
    </DefaultLayout>
  );
};

export default CreateAdmin;
