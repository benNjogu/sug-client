import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import DefaultLayout from '../../components/default-layout/default-layout.component';
import FilterNominees from '../../components/filter-component';
import AddAdminModal from '../../components/modal/add-admin-modal.component';
import { CreateNewAdmin } from '../../redux/slices/auth';
import Spinner from '../../components/spinner';

const CreateAdmin = () => {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const dispatch = useDispatch();

  let type_of_admins = [
    'All',
    'Super Admin',
    'Admin I',
    'Admin II',
    'Admin I&II',
    'Admin III',
    'Admin I&II&III',
  ];

  const handleAddNew = () => {
    setShowAddAdminModal(true);
  };

  const handleAddAdmin = (data) => {
    dispatch(CreateNewAdmin(data));
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
              handleAddAdmin={(data) => handleAddAdmin(data)}
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
