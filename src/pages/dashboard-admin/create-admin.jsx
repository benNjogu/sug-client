import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import FilterNominees from "./../../components/filter-component/filter-component";
import AddAdminModal from "../../components/modal/add-admin-modal.component";
import {
  CreateNewAdmin,
  EditAdmin,
  FetchAllAdmins,
} from "../../redux/slices/admin";
import { constants } from "../../data/constants";
import UsersCard from "../../components/users-card/users-card.component";
import Spinner from "../../components/spinner";
import { socket } from "../../socket";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState(constants.SELECT);
  const [adminToEdit, setAdminToEdit] = useState(null);

  const my_id = window.localStorage.getItem("user_id");
  let { account_type } = useSelector((state) => state.auth.user_data);
  let { admins } = useSelector((state) => state.admin);

  if (account_type === process.env.REACT_APP_AccountType4) {
    admins = admins.filter(
      (a) =>
        a.account_type === process.env.REACT_APP_AccountType1 ||
        a.account_type === process.env.REACT_APP_AccountType2 ||
        a.account_type === process.env.REACT_APP_AccountType3
    );
  } else if (account_type === process.env.REACT_APP_AccountType5) {
    admins = admins.filter(
      (a) =>
        a.account_type === process.env.REACT_APP_AccountType1 ||
        a.account_type === process.env.REACT_APP_AccountType2 ||
        a.account_type === process.env.REACT_APP_AccountType3 ||
        a.account_type === process.env.REACT_APP_AccountType4
    );
  }

  let type_of_admins = [
    constants.SELECT,
    constants.LEVEL_1,
    constants.LEVEL_2,
    constants.LEVEL_3,
  ];

  if (account_type === process.env.REACT_APP_AccountType5) {
    type_of_admins = [...type_of_admins, constants.LEVEL_4];
  }

  const handleAddNew = () => {
    setAdminToEdit(null);
    setShowAddAdminModal(true);
  };

  const handleAddAdmin = (data) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(CreateNewAdmin(data));
      setLoading(false);
      // setInactiveBtn(true);
    }, 700);
  };

  const handleEdit = (admin) => {
    setAdminToEdit(admin);
    setShowAddAdminModal(true);
  };

  const handleEditAdmin = (data) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(EditAdmin(data));
      setLoading(false);
    }, 700);
  };

  const handleCancel = () => {
    setShowAddAdminModal(false);
  };

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

  const disableAdmin = (his_id) => {
    setLoading(true);

    setTimeout(() => {
      let data = { his_id, my_id };
      socket.emit("disable-admin", data);
      // dispatch(DisableAdmin({ his_id, my_id }));

      setLoading(false);
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
    admins = admins.filter(
      (a) => a.account_type.toLowerCase() === level.toLowerCase()
    );
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
    socket.on("disable-admin", (data) => {
      // Fetch admins on disable
      dispatch(FetchAllAdmins());
    });

    // Fetch admins on start
    dispatch(FetchAllAdmins());

    return () => {
      socket.off("disable-admin");
    };
  }, []);

  return (
    <DefaultLayout>
      {contextHolder}
      <Spinner loading={loading} />
      {showAddAdminModal && (
        <Modal
          open={showAddAdminModal}
          title={`${adminToEdit === null ? `New Admin` : `Edit Admin`}`}
          onCancel={handleCancel}
          footer={false}
        >
          {
            <AddAdminModal
              handleClose={handleCancel}
              handleAddAdmin={(data) => handleAddAdmin(data)}
              handleEditAdmin={(data) => handleEditAdmin(data)}
              options={type_of_admins}
              adminToEdit={adminToEdit}
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
                  btn1Click={() => handleEdit(a)}
                  btn2Click={() => handleDisable(a.user_id)}
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
