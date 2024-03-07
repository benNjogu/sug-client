import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';

import DefaultLayout from '../../components/default-layout/default-layout.component';
import FilterNominees from '../../components/filter-component';
import AddAdminModal from '../../components/modal/add-admin-modal.component';
import { CreateNewAdmin } from '../../redux/slices/auth';
import { constants } from '../../data/constants';

const CreateAdmin = () => {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const dispatch = useDispatch();

  let { account_type } = useSelector((state) => state.auth.user_data);

  let type_of_admins = [constants.SELECT, constants.LEVEL_1, constants.LEVEL_2];

  if (account_type === process.env.REACT_APP_AccountType4) {
    type_of_admins = [...type_of_admins, constants.LEVEL_3];
  }

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
