import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import { GetAllOrganizations } from "../../redux/slices/organization";
import { DisableOrganization } from "../../redux/slices/admin";
import { addSerialNumber, status } from "../../utils/addSerialNumber";
import SearchBox from "../../components/search-box";
import Spinner from "../../components/spinner";

const AllOrganization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inactiveBtn, setInactiveBtn] = useState(false);

  let { organizations } = useSelector((state) => state.organization);

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Organization",
      dataIndex: "user_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Levy No.",
      dataIndex: "levy_no",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <button
            class="btn btn-sm btn-outline-success"
            onClick={() => handleViewOrganization(record)}
          >
            View
          </button>
          <button
            class="btn btn-sm btn-outline-danger"
            onClick={() => handleDisableOrganization(record.organization_id)}
            disabled={!record.active}
          >
            {record.active ? "Disable" : "Disabled"}
          </button>
        </div>
      ),
    },
  ];

  // Searching from organization using levy_no, name or email.
  if (searchQuery) {
    organizations = organizations.filter(
      (org) =>
        org.user_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        org.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        org.levy_no.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleViewOrganization = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-organization", { state: { record } });
    }, 700);
  };

  const [modal, contextHolder] = Modal.useModal();
  const handleDisableOrganization = (id) => {
    modal.confirm({
      title: "Disable",
      icon: <QuestionCircleOutlined />,
      content: "Disable this organization? Cannot be reversed!!!",
      okText: "DISABLE",
      cancelText: "CANCEL",
      onOk: () => disableOrganization(id),
    });
  };

  const disableOrganization = (id) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(DisableOrganization(id));
      setLoading(false);
      setInactiveBtn(true);
    }, 500);
  };

  useEffect(() => {
    dispatch(GetAllOrganizations());
  }, []);

  return (
    <DefaultLayout>
      {contextHolder}
      <SearchBox
        placeholder={"Search organization by name, email or levy number..."}
        value={searchQuery}
        onChange={handleSearch}
      />
      <Spinner loading={loading} />
      <Table
        className="mt-3"
        columns={columns}
        dataSource={addSerialNumber(organizations, status.All)}
      />
    </DefaultLayout>
  );
};

export default AllOrganization;
