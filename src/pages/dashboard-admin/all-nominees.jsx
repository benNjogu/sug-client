import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import SearchBox from "../../components/search-box";
import { DisableNominee, FetchAllNominees } from "../../redux/slices/admin";
import UsersCard from "../../components/users-card/users-card.component";
import Spinner from "../../components/spinner";
import ViewUser from "../../components/modal/view-user-modal";

const AllNominees = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showViewNomineeModal, setShowViewNomineeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});

  const my_id = window.localStorage.getItem("user_id");
  let { nominees } = useSelector((state) => state.admin);

  const [modal, contextHolder] = Modal.useModal();
  const handleDisable = (id) => {
    modal.confirm({
      title: "Disable",
      icon: <QuestionCircleOutlined />,
      content: "Disable this nominee? Cannot be reversed!!!",
      okText: "DISABLE",
      cancelText: "CANCEL",
      onOk: () => disableNominee(id),
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Searching from firstName, lastName, both lastName and lastName and national id number.
  if (searchQuery) {
    nominees = nominees.filter(
      (n) =>
        n.first_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        n.last_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        // combinines firstName and lastName
        (n.first_name + " " + n.last_name)
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase()) ||
        // converts idNumber to a string first
        n.idNumber
          .toString()
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
    );
  }

  const handleView = (data) => {
    setShowViewNomineeModal(true);
    setUser(data);
  };

  const handleCancel = () => {
    setShowViewNomineeModal(false);
  };

  const disableNominee = (his_id) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(DisableNominee({ his_id, my_id }));
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    dispatch(FetchAllNominees());
  }, []);

  return (
    <DefaultLayout>
      {contextHolder}
      <Spinner loading={loading} />
      <SearchBox
        placeholder={"Search nominee by id or name..."}
        value={searchQuery}
        onChange={handleSearch}
      />
      {showViewNomineeModal && (
        <Modal
          open={showViewNomineeModal}
          title={`User Data`}
          onCancel={handleCancel}
          footer={false}
        >
          {<ViewUser user={user} />}
        </Modal>
      )}
      <div className="row overflow-auto mt-3">
        {nominees.length > 0
          ? nominees.map((n) => (
              <div key={n.id} className="col-md-4 mb-3">
                <UsersCard
                  btn1Text={"View"}
                  btn2Text={n.active ? "Disable" : "Disabled"}
                  btn1Click={handleView}
                  btn2Click={() => handleDisable(n.id)}
                  user={n}
                />
              </div>
            ))
          : ""}
      </div>
    </DefaultLayout>
  );
};

export default AllNominees;
