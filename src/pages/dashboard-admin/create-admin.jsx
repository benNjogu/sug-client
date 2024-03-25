import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import FilterNominees from "./../../components/filter-component/filter-component";
import AddAdminModal from "../../components/modal/add-admin-modal.component";
import { CreateNewAdmin } from "../../redux/slices/auth";
import { constants } from "../../data/constants";
import { DisableAdmin, FetchAllAdmins } from "../../redux/slices/admin";
import UsersCard from "../../components/users-card/users-card.component";
import Spinner from "../../components/spinner";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inactiveBtn, setInactiveBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState(constants.SELECT);

  let { account_type } = useSelector((state) => state.auth.user_data);
  let { admins } = useSelector((state) => state.admin);
  if (account_type === process.env.REACT_APP_AccountType3) {
    admins = admins.filter(
      (a) =>
        a.account_type === process.env.REACT_APP_AccountType1 ||
        a.account_type === process.env.REACT_APP_AccountType2
    );
  } else if (account_type === process.env.REACT_APP_AccountType4) {
    admins = admins.filter(
      (a) =>
        a.account_type === process.env.REACT_APP_AccountType1 ||
        a.account_type === process.env.REACT_APP_AccountType2 ||
        a.account_type === process.env.REACT_APP_AccountType3
    );
  }

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

  const handleView = () => {};

  const [modal, contextHolder] = Modal.useModal();
  const handleDisable = (id) => {
    modal.confirm({
      title: "Disable",
      icon: <QuestionCircleOutlined />,
      content: "Disable this nominee? Cannot be reversed!!!",
      okText: "DISABLE",
      cancelText: "CANCEL",
      onOk: () => disableAdmin(id),
    });
  };

  const disableAdmin = (id) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(DisableAdmin(id));
      setLoading(false);
      setInactiveBtn(true);
    }, 500);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (e) => {
    e.preventDefault();
    setLevel(e.target.value);
  };

  if (level !== constants.SELECT) {
    admins = admins.filter((a) => a.account_type === level);
  }

  // Searching from firstName, lastName, both lastName and lastName and email.
  if (searchQuery) {
    admins = admins.filter(
      (a) =>
        a.user_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  useEffect(() => {
    dispatch(FetchAllAdmins());
  }, []);

  return (
    <DefaultLayout>
      {contextHolder}
      <Spinner loading={loading} />
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
      <FilterNominees
        onAddNew={handleAddNew}
        options={type_of_admins}
        placeholder={"Search admin by email or name..."}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onSort={handleSort}
      />
      <div className="row overflow-auto mt-2">
        {admins.length > 0
          ? admins.map((a) => (
              <div key={a.id} className="col-md-4 mb-3">
                <UsersCard
                  btn1Text={"Edit"}
                  btn2Text={a.active ? "Disable" : "Disabled"}
                  btn1Click={handleView}
                  btn2Click={() => handleDisable(a.id)}
                  deactivateBtn={inactiveBtn}
                  user={a}
                />
              </div>
            ))
          : ""}
      </div>
    </DefaultLayout>
  );
};

export default CreateAdmin;
