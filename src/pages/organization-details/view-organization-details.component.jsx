import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table, Tabs, message } from "antd";
import { EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import Navbar from "../../components/navbar/navbar.component";
import "./view-organization-details.styles.css";
import Spinner from "../../components/spinner";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";
import { addSerialNumber, status } from "../../utils/addSerialNumber";
import { constants } from "../../data/constants";
import UsersCard from "../../components/users-card/users-card.component";
import {
  FetchAllDeletedNominees,
  FetchAllManagers,
  FetchAllNominees,
} from "../../redux/slices/admin";
import SearchBox from "../../components/search-box";

const { TabPane } = Tabs;

const ViewOrganizationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state.record;
  const [loading, setLoading] = useState(false);
  const [orgApplications, setOrgApplications] = useState([]);
  const [orgApprovedApplications, setOrgApprovedApplications] = useState([]);
  const [deffereddApplications, setDeffereddApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  let [orgNominees, setOrgNominees] = useState([]);
  let [deletedNominees, setDeletedNominees] = useState([]);
  let [orgManagers, setOrgManagers] = useState([]);
  const [inactiveBtn, setInactiveBtn] = useState(false);

  const [searchNominee, setSearchNominee] = useState("");
  const [searchDeletedNominee, setSearchDeletedNominee] = useState("");

  let { applications } = useSelector((state) => state.admin);
  let { approved_applications } = useSelector((state) => state.admin);
  let { defferred_rejected_applications } = useSelector((state) => state.admin);
  let { nominees } = useSelector((state) => state.admin);
  let { deleted_nominees } = useSelector((state) => state.admin);
  let { all_hr_managers } = useSelector((state) => state.admin);

  const application_columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Course",
      dataIndex: "course_title",
    },
    {
      title: "Date of application",
      dataIndex: "date_applied",
      render(text, record) {
        return {
          children: (
            <div>
              {convertDigitInString(record.date_applied.split("T")[0])}
              {", "}
              {getTime(record.date_applied)}
            </div>
          ),
        };
      },
    },
    {
      title: "Status",
      dataIndex: "approved",
      render(text, record) {
        return {
          props: {
            style: {
              color:
                record.approved === constants.REJECTED
                  ? "red"
                  : record.approved === constants.STAGE_1
                  ? "#32CD32"
                  : record.approved === constants.APPROVED
                  ? "	#008000"
                  : record.approved === constants.DEFFERED
                  ? "	#FFC107"
                  : "",
              fontWeight: 600,
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) =>
        record.approved === constants.REJECTED ? (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ) : record.approved === constants.PENDING ? (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ) : (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ),
    },
  ];

  const managers_columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "ID Number",
      dataIndex: "national_id_number",
    },
    {
      title: "ID Doc",
      dataIndex: "id_pdf",
      render(text, record) {
        return {
          props: {
            style: {
              color: "#1e90ff",
              fontWeight: 600,
              cursor: "pointer",
            },
          },
          children: <div onClick={() => console.log("download")}>{text}</div>,
        };
      },
    },
  ];

  const handleViewApplication = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", { state: { record } });
    }, 700);
  };

  const handleSearchNominee = (query) => {
    setSearchNominee(query);
  };

  const handleSearchDeletedNominee = (query) => {
    setSearchDeletedNominee(query);
  };

  const handleBackpressed = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate(-1);
    }, 300);
  };

  const handleView = (id) => {
    console.log("nv_id", id);
  };

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

  const disableNominee = (id) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(DisableNominee(id));
      setLoading(false);
      setInactiveBtn(true);
    }, 500);
  };

  useEffect(() => {
    dispatch(FetchAllNominees());
    dispatch(FetchAllDeletedNominees());
    setOrgApplications(
      (applications = applications.filter(
        (application) =>
          Number(application.organization_id) === Number(record.organization_id)
      ))
    );

    setOrgApprovedApplications(
      (approved_applications = approved_applications.filter(
        (application) =>
          Number(application.organization_id) ===
            Number(record.organization_id) &&
          Number(application.approved) === status.Approved
      ))
    );

    let defferred_applications = defferred_rejected_applications.filter(
      (application) =>
        Number(application.organization_id) ===
          Number(record.organization_id) &&
        Number(application.approved) === status.Deffered
    );
    setDeffereddApplications(defferred_applications);

    let rejected_applications = defferred_rejected_applications.filter(
      (application) =>
        Number(application.organization_id) ===
          Number(record.organization_id) &&
        Number(application.approved) === status.Rejected
    );
    setRejectedApplications(rejected_applications);

    let org_nominees = nominees.filter(
      (n) => Number(n.organization) === Number(record.organization_id)
    );
    setOrgNominees(org_nominees);

    setDeletedNominees(
      deleted_nominees.filter(
        (n) => Number(n.organization) === Number(record.organization_id)
      )
    );

    dispatch(FetchAllManagers());
    setOrgManagers(
      all_hr_managers.filter(
        (m) => Number(m.organization) === Number(record.organization_id)
      )
    );
  }, []);

  return (
    <>
      {contextHolder}
      <Navbar title={record.user_name} handleBackpressed={handleBackpressed} />
      <div className="main-container">
        <Spinner loading={loading} />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key={1}>
            <div>
              <div class="form-row">
                <legend className="text-info">Profile Details.</legend>
                <div class="col-md-4 form-group">
                  <label for="name">Name of the organization:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="form-control"
                    value={record.user_name}
                    readOnly
                  />
                </div>
                <div class="col-md-4 form-group">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    value={record.email}
                    readOnly
                  />
                </div>
                <div class="col-md-4 form-group">
                  <label for="levy_no">Levy Registration Number:</label>
                  <input
                    type="text"
                    name="levy_no"
                    id="levy_no"
                    class="form-control"
                    value={record.levy_no}
                    readOnly
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-3 form-group">
                  <label for="address">Town:</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="form-control"
                    value={record.town}
                    readOnly
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label for="street">Street:</label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    class="form-control"
                    value={record.street}
                    readOnly
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label for="building">Building:</label>
                  <input
                    type="text"
                    name="building"
                    id="building"
                    class="form-control"
                    value={record.building}
                    readOnly
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label for="floor">Floor:</label>
                  <input
                    type="number"
                    name="floor"
                    id="floor"
                    class="form-control"
                    maxLength={2}
                    value={record.floor}
                    readOnly
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 form-group">
                  <label for="box">P.O. Box:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="box"
                    id="box"
                    value={record.box}
                    readOnly
                  />
                </div>
                <div class="col-md-2 form-group">
                  <label for="code">Code:</label>
                  <input
                    type="number"
                    name="code"
                    id="code"
                    class="form-control"
                    value={record.code}
                    readOnly
                  />
                </div>
                <div class="col-md-4 form-group">
                  <label for="phone">Phone/Fax Number:</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    class="form-control"
                    value={record.phone}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Applications" key={2}>
            <Table
              dataSource={addSerialNumber(orgApplications, status.All)}
              columns={application_columns}
              className="mt-2"
            />
          </TabPane>
          <TabPane tab="Approved" key={3}>
            <Table
              dataSource={addSerialNumber(orgApprovedApplications, status.All)}
              columns={application_columns}
              className="mt-2"
            />
          </TabPane>
          <TabPane tab="Deffered" key={4}>
            <Table
              dataSource={addSerialNumber(deffereddApplications, status.All)}
              columns={application_columns}
              className="mt-2"
            />
          </TabPane>
          <TabPane tab="Rejected" key={5}>
            <Table
              dataSource={addSerialNumber(rejectedApplications, status.All)}
              columns={application_columns}
              className="mt-2"
            />
          </TabPane>
          <TabPane tab="Nominees" key={6}>
            <SearchBox
              placeholder={"Search nominee by id or name..."}
              value={searchNominee}
              onChange={handleSearchNominee}
            />
            <div className="row overflow-auto mt-3">
              {orgNominees.length > 0
                ? orgNominees.map((n) => (
                    <div key={n.id} className="col-md-4 mb-3">
                      <UsersCard
                        btn1Text={"View"}
                        btn2Text={n.active ? "Disable" : "Disabled"}
                        btn1Click={handleView}
                        btn2Click={handleDisable}
                        deactivateBtn={inactiveBtn}
                        user={n}
                      />
                    </div>
                  ))
                : ""}
            </div>{" "}
          </TabPane>
          <TabPane tab="Deleted Nominees" key={7}>
            <SearchBox
              placeholder={"Search nominee by id or name..."}
              value={searchDeletedNominee}
              onChange={handleSearchDeletedNominee}
            />
            <div className="row overflow-auto mt-3">
              {deletedNominees.length > 0
                ? deletedNominees.map((n) => (
                    <div key={n.id} className="col-md-4 mb-3">
                      <UsersCard
                        btn1Text={"View"}
                        btn2Text={n.active ? "Disable" : "Disabled"}
                        btn1Click={handleView}
                        btn2Click={handleDisable}
                        deactivateBtn={inactiveBtn}
                        user={n}
                      />
                    </div>
                  ))
                : ""}
            </div>{" "}
          </TabPane>
          <TabPane tab="HR Managers" key={8}>
            <Table
              dataSource={addSerialNumber(orgManagers, status.All)}
              columns={managers_columns}
              className="mt-2"
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ViewOrganizationDetails;
