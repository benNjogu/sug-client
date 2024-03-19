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
  const [inactiveBtn, setInactiveBtn] = useState(false);

  const [searchNominee, setSearchNominee] = useState("");
  const [searchDeletedNominee, setSearchDeletedNominee] = useState("");

  let { applications } = useSelector((state) => state.admin);
  let { approved_applications } = useSelector((state) => state.admin);
  let { defferred_rejected_applications } = useSelector((state) => state.admin);
  let { nominees } = useSelector((state) => state.admin);
  let { deleted_nominees } = useSelector((state) => state.admin);

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
  }, []);

  return (
    <>
      {contextHolder}
      <Navbar title={record.user_name} handleBackpressed={handleBackpressed} />
      <div className="main-div">
        <Spinner loading={loading} />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key={1}>
            <div>
              <Spinner loading={loading} />
              <div class="form-row">
                <legend className="text-info">Profile Details.</legend>
                <div class="col-md-4 form-group">
                  <label for="name">Name of the organization:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="form-control"
                    placeholder="Keytech solutions"
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
                    placeholder="organization@domain.com"
                    value={record.email}
                    readOnly
                  />
                </div>
                <div class="col-md-4 form-group">
                  <label for="regno">Levy Registration Number:</label>
                  <input
                    type="text"
                    name="regno"
                    id="regno"
                    class="form-control"
                    placeholder="ABCD1234"
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
                    placeholder="Nairobi"
                    value={record.town}
                    readOnly
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label for="address">Street:</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="form-control"
                    placeholder="1234 Grand Avenue"
                    value={record.address}
                    readOnly
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label for="apartment">Building:</label>
                  <input
                    type="text"
                    name="apartment"
                    id="apartment"
                    class="form-control"
                    placeholder="Kenda House"
                    value={record.apartment}
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
                    placeholder="2"
                    value={record.number}
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
                    placeholder="49 Maragua"
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
                    placeholder="102005"
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
                    placeholder="+254 745 580 333"
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
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ViewOrganizationDetails;
