import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Table, Tag } from "antd";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";

import { constants } from "./../../data/constants";
import {
  GetApplicationGroupDates,
  GetApplicationHR,
  GetApplicationNominees,
  GetBannerData,
  UpdateAdminWorkingOnApplication,
} from "../../redux/slices/application";
import Navbar from "../../components/navbar/navbar.component";
import Spinner, { FetchingData } from "./../../components/spinner";
import RejectApplicationModal from "../../components/modal/reject-application-modal.component";
import ApproveApplicationModal from "./../../components/modal/approve-application-modal.component";
import DefferApplicationModal from "../../components/modal/deffer-application-modal.component";
import {
  ApproveApplication,
  DefferOrRejectApplication,
} from "../../redux/slices/admin";
import { GetAllOrganizations } from "../../redux/slices/organization";
import { addSerialNumber, status } from "./../../utils/addSerialNumber";
import { FetchAllRegisteredUsers } from "../../redux/slices/nominee";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import ViewUser from "../../components/modal/view-user-modal";

import "./view-application-details.styles.css";

const Banner = ({ type, title, reason, name, email, phone, date }) => (
  <div className="col-md-12">
    <div className="row">
      <div className="col-md-12">
        <div className={`alert alert-${type} mb-4`} role="alert">
          <h2 className="alert-heading">{title}!</h2>
          <p>
            {reason}
            {name && (
              <p className="verifier-name alert-link">
                - By {name}, {name ? date : email}.
              </p>
            )}
            {phone && <p className="verifier-name alert-link">- {phone}.</p>}
            {name ? "" : <p className="verifier-name alert-link">- {date}.</p>}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ViewApplicationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state.record;
  console.log("rr", record);

  const [loading, setLoading] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState([]);
  const [hideButtons, setHideButtons] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDefferModal, setShowDefferModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState({});
  const [showViewNomineeModal, setShowViewNomineeModal] = useState(false);

  const addComma = (number) =>
    "KSh. " + Intl.NumberFormat("en-US").format(number);

  const { organizations } = useSelector((state) => state.organization);
  console.log("orgs", organizations);
  const { applicationNominees } = useSelector((state) => state.application);
  console.log("an", applicationNominees);
  const { applicationDates } = useSelector((state) => state.application);
  console.log("ad", applicationDates);
  let { nominees } = useSelector((state) => state.nominee);
  console.log("n", nominees);
  const { applicationHR } = useSelector((state) => state.application);
  console.log(applicationHR);
  const { bannerData } = useSelector((state) => state.application);
  console.log("bannerd", bannerData);
  const { account_type } = useSelector((state) => state.auth).user_data;

  //filtering nominees based on fetched ids
  const getFilteredNominees = () => {
    let filteredNominees = [];
    for (let i = 0; i < applicationNominees.length; i++) {
      for (let j = 0; j < nominees.length; j++) {
        if (applicationNominees[i].nominee_id === nominees[j].id) {
          // Add group id to each nominee
          let group_id = applicationNominees[i].group_id;
          // Add each nominee belonging to this application to a new array
          filteredNominees.push({ ...nominees[j], group_id });
        } else continue;
      }
    }

    return filteredNominees;
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "FirstName",
      dataIndex: "first_name",
    },
    {
      title: "LastName",
      dataIndex: "last_name",
    },
    {
      title: "Gender",
      dataIndex: "sex",
    },
    {
      title: "Job Level",
      dataIndex: "job_level",
    },
    {
      title: "ID Number",
      dataIndex: "idNumber",
    },
    {
      title: "ID PDF",
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
          children: <div onClick={() => console.log("VIEW")}>{text}</div>,
        };
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <EyeOutlined
            className="mx-2"
            onClick={() => handleViewNominee(record)}
          />
        </div>
      ),
    },
  ];

  const handleViewNominee = (n) => {
    setSelectedNominee({
      ...n,
      user_name: currentOrganization[0].user_name,
    });
    setShowViewNomineeModal(true);
  };

  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const [modal, contextHolder] = Modal.useModal();
  const handleApproveLevel2 = () => {
    modal.confirm({
      title: "Approve",
      icon: <CheckCircleOutlined />,
      content: "Approve this application?",
      okText: "APPROVE",
      cancelText: "CANCEL",
      onOk: handleAppApproveLevel2,
    });
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const handleDeffer = () => {
    setShowDefferModal(true);
  };

  const handleCancel = () => {
    setShowApproveModal(false);
    setShowDefferModal(false);
    setShowRejectModal(false);
    setShowViewNomineeModal(false);
  };

  const handleBackpressed = () => {
    setLoading(true);
    if (
      (account_type === process.env.REACT_APP_AccountType1 ||
        account_type === process.env.REACT_APP_AccountType2) &&
      record.approved === constants.PENDING
    ) {
      let current_admin_id = Number(window.localStorage.getItem("user_id"));
      dispatch(UpdateAdminWorkingOnApplication(record.id, 0, current_admin_id));
    }

    setTimeout(() => {
      setLoading(false);

      navigate(-1);
    }, 300);
  };

  const handleAppApprove = (reason) => {
    dispatch(
      ApproveApplication({
        level: account_type,
        application_id: record.id,
        recommedation: reason.in_house + "," + reason.open_house,
      })
    );
    setHideButtons(true);
  };

  const handleAppApproveLevel2 = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(
        ApproveApplication({
          level: account_type,
          application_id: record.id,
        })
      );
    }, 300);
  };

  const handleAppReject = (reason) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(
        DefferOrRejectApplication({
          level: account_type,
          application_id: record.id,
          reason: reason.rejection_message,
          type: status.Rejected,
        })
      );
    }, 300);
  };

  const handleAppDeffer = (reason) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(
        DefferOrRejectApplication({
          level: account_type,
          application_id: record.id,
          reason: reason.deffer_message,
          type: status.Deffered,
        })
      );
    }, 300);
  };

  const handleViewOrganization = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-organization", {
        state: { record: { ...currentOrganization[0] } },
      });
    }, 700);
  };

  const getNumberOfGroups = () => {
    let size = [];
    for (let i = 1; i <= applicationDates.length; i++) {
      size.push(i);
    }

    return size;
  };

  const handleEdit = (record) => {
    console.log("edit", record);
  };

  useEffect(() => {
    console.log("dispatching stuff");
    // Update admin working on the application aftet 1 min of opening
    if (
      (account_type === process.env.REACT_APP_AccountType1 ||
        account_type === process.env.REACT_APP_AccountType2) &&
      record.approved === constants.PENDING
    ) {
      let current_admin_id = Number(window.localStorage.getItem("user_id"));
      dispatch(
        UpdateAdminWorkingOnApplication(
          record.id,
          current_admin_id,
          current_admin_id
        )
      );
    }

    if (organizations === null || organizations.length === 0) {
      dispatch(GetAllOrganizations());
    }

    setCurrentOrganization(
      organizations.filter(
        (org) => org.organization_id === record.organization_id
      )
    );

    // get nominees for this application
    dispatch(GetApplicationNominees(record.id));

    // get dates for various groups
    dispatch(GetApplicationGroupDates(record.id));

    dispatch(GetApplicationHR(record.id));

    dispatch(FetchAllRegisteredUsers(record.organization_id));

    if (
      record.approved === constants.DEFFERED ||
      record.approved === constants.REJECTED
    )
      dispatch(GetBannerData(record.id, 0));

    if (record.approved === constants.APPROVED)
      dispatch(GetBannerData(record.id, 2));

    if (account_type === process.env.REACT_APP_AccountType2) {
      if (record.approved === constants.STAGE_1) {
        dispatch(GetBannerData(record.id, 1));
      }
      if (record.approved === constants.APPROVED) {
        dispatch(GetBannerData(record.id, 2));
      }
    }
  }, []);

  if (
    account_type === process.env.REACT_APP_AccountType2 &&
    (record.approved === constants.STAGE_1 ||
      record.approved === constants.APPROVED)
  )
    return (
      <>
        {contextHolder}
        <Navbar
          title={record.course_title}
          handleApprove={handleApprove}
          handleApproveLevel2={handleApproveLevel2}
          handleReject={handleReject}
          handleDeffer={handleDeffer}
          handleEdit={handleEdit}
          handleBackpressed={handleBackpressed}
          approved={record.approved}
          hideButtons={hideButtons}
        />
        <div className="main-div">
          {showApproveModal && (
            <Modal
              open={showApproveModal}
              title={`Approve application`}
              onCancel={handleCancel}
              footer={false}
            >
              {
                <ApproveApplicationModal
                  handleClose={handleCancel}
                  handleApprove={handleAppApprove}
                />
              }
            </Modal>
          )}
          {showDefferModal && (
            <Modal
              open={showDefferModal}
              title={`Reason for deffer`}
              onCancel={handleCancel}
              footer={false}
            >
              {
                <DefferApplicationModal
                  handleClose={handleCancel}
                  handleDeffer={handleAppDeffer}
                />
              }
            </Modal>
          )}
          {showRejectModal && (
            <Modal
              open={showRejectModal}
              title={`Reason for rejection`}
              onCancel={handleCancel}
              footer={false}
            >
              {
                <RejectApplicationModal
                  handleClose={handleCancel}
                  handleReject={handleAppReject}
                />
              }
            </Modal>
          )}
          <Spinner loading={loading} />
          {record.approved === constants.APPROVED && (
            <div className="main-div--rejection row">
              <Banner
                type={"success"}
                title={"Application Approved"}
                reason={bannerData[0]?.recommendation}
                name={bannerData[0]?.level_2}
                date={bannerData[0]?.date_2?.split("T")[0]}
              />
            </div>
          )}
          {record.approved === constants.DEFFERED && (
            <div className="main-div--rejection row">
              <Banner
                type={"warning"}
                title={"Application Defferred"}
                reason={record.reason || bannerData[0]?.reason}
                name={bannerData[0]?.user_name}
                email={bannerData[0]?.email}
                phone={bannerData[0]?.phone}
              />
            </div>
          )}
          {record.approved === constants.REJECTED && (
            <div className="main-div--rejection row">
              <Banner
                type={"danger"}
                title={"Application Rejected"}
                reason={record.reason || bannerData[0]?.reason}
                name={bannerData[0]?.user_name}
                email={bannerData[0]?.email}
                phone={bannerData[0]?.phone}
              />
            </div>
          )}
          <div className="main-div--profile row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <legend className="text-info">
                    TRAINING APPLICATION ANALYSIS.
                  </legend>
                  <div class="form-row">
                    {currentOrganization.length > 0 ? (
                      <div class="col-md-12">
                        <div class="form-row">
                          <div className="col-md-6">
                            <div>
                              <label for="name" className="label w-25">
                                Name:
                              </label>
                              <span
                                className="org_name"
                                onClick={handleViewOrganization}
                              >
                                {currentOrganization[0].user_name}
                              </span>
                            </div>
                            <div>
                              <label for="levy_no" className="label w-25">
                                Levy RegNo:
                              </label>
                              <span>{currentOrganization[0].levy_no}</span>
                            </div>
                            <div>
                              <label for="date" className="label w-25">
                                Date received:
                              </label>
                              <span>
                                {convertDigitInString(
                                  record.date_applied.split("T")[0]
                                )}
                              </span>
                            </div>
                            <div>
                              <label for="type" className="label w-25">
                                Training applied for:
                              </label>
                              <span>{record.type_of_training}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div>
                              <label for="course_title" className="label w-25">
                                Course title:
                              </label>
                              <span>{record.course_title}</span>
                            </div>
                            <div>
                              <label for="provider" className="label w-25">
                                Training provider:
                              </label>
                              <span>{record.training_provider}</span>
                            </div>
                            <div>
                              <label for="venue" className="label w-25">
                                Course venue:
                              </label>
                              <span>{record.course_venue}</span>
                            </div>
                            <div>
                              <label for="total" className="label w-25">
                                Training Cost :
                              </label>
                              <span className="font-weight-bold">
                                {addComma(record.total_cost)}
                              </span>
                            </div>
                            <div>
                              <label for="total" className="label w-25">
                                No. of Nominees :
                              </label>
                              <span>{getFilteredNominees().length}</span>
                            </div>
                          </div>
                        </div>
                        <div class="form-row mt-3">
                          <div className="col-md-12">
                            {applicationDates !== null ? (
                              <div class="form-row">
                                {getNumberOfGroups().map((idx) => (
                                  <>
                                    <div class="col-md-6">
                                      <label
                                        for="course_objectives"
                                        className="label"
                                      >
                                        {getNumberOfGroups().length > 1
                                          ? `Group ${idx} start date:`
                                          : `Start date:`}
                                      </label>
                                      <span className="span--block">
                                        {convertDigitInString(
                                          applicationDates[
                                            idx - 1
                                          ].start_date.split("T")[0]
                                        )}
                                      </span>
                                    </div>
                                    <div class="col-md-6">
                                      <label
                                        for="course_objectives"
                                        className="label"
                                      >
                                        {getNumberOfGroups().length > 1
                                          ? `Group ${idx} end date:`
                                          : `End date:`}
                                      </label>
                                      <span className="span--block">
                                        {convertDigitInString(
                                          applicationDates[
                                            idx - 1
                                          ].end_date.split("T")[0]
                                        )}
                                      </span>
                                    </div>
                                  </>
                                ))}
                              </div>
                            ) : (
                              <FetchingData />
                            )}
                          </div>
                        </div>
                        <div class="form-row mt-5">
                          <div className="col-md-12">
                            <div>
                              <label
                                for="recommendation"
                                className="label w-25"
                              >
                                Recomendation:
                              </label>
                              <span>{bannerData[0].recommendation}</span>
                            </div>
                            <div>
                              <label for="name" className="label w-25">
                                Name of recommending officer:
                              </label>
                              <span>
                                {bannerData[0].level_1 ||
                                  bannerData[0].user_name}
                              </span>
                            </div>
                            <div>
                              <label for="date" className="label w-25">
                                Date:
                              </label>
                              <span>
                                {bannerData[0]?.date_1?.split("T")[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <FetchingData />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      {contextHolder}
      <Spinner loading={loading} />
      <Navbar
        title={record.course_title}
        handleApprove={handleApprove}
        handleApproveLevel2={handleApproveLevel2}
        handleReject={handleReject}
        handleDeffer={handleDeffer}
        handleEdit={handleEdit}
        handleBackpressed={handleBackpressed}
        approved={record.approved}
        hideButtons={hideButtons}
      />
      <div className="main-div">
        {showApproveModal && (
          <Modal
            open={showApproveModal}
            title={`Approve application`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <ApproveApplicationModal
                handleClose={handleCancel}
                handleApprove={handleAppApprove}
              />
            }
          </Modal>
        )}
        {showDefferModal && (
          <Modal
            open={showDefferModal}
            title={`Reason for deffer`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <DefferApplicationModal
                handleClose={handleCancel}
                handleDeffer={handleAppDeffer}
              />
            }
          </Modal>
        )}
        {showRejectModal && (
          <Modal
            open={showRejectModal}
            title={`Reason for rejection`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <RejectApplicationModal
                handleClose={handleCancel}
                handleReject={handleAppReject}
              />
            }
          </Modal>
        )}
        {showViewNomineeModal && (
          <Modal
            open={showViewNomineeModal}
            title={`User Data`}
            onCancel={handleCancel}
            footer={false}
          >
            {<ViewUser user={selectedNominee} />}
          </Modal>
        )}
        {record.approved === constants.APPROVED && (
          <div className="main-div--rejection row">
            <Banner
              type={"success"}
              title={"Application Approved"}
              reason={bannerData[0]?.recommendation}
              name={bannerData[0]?.level_2}
              date={convertDigitInString(bannerData[0]?.date_2?.split("T")[0])}
            />
          </div>
        )}
        {record.approved === constants.DEFFERED && (
          <div className="main-div--rejection row">
            <Banner
              type={"warning"}
              title={"Application Defferred"}
              reason={record.reason || bannerData[0]?.reason}
              name={bannerData[0]?.user_name}
              email={bannerData[0]?.email}
              phone={bannerData[0]?.phone}
              date={convertDigitInString(bannerData[0]?.date?.split("T")[0])}
            />
          </div>
        )}
        {record.approved === constants.REJECTED && (
          <div className="main-div--rejection row">
            <Banner
              type={"danger"}
              title={"Application Rejected"}
              reason={record.reason || bannerData[0]?.reason}
              name={bannerData[0]?.user_name}
              email={bannerData[0]?.email}
              phone={bannerData[0]?.phone}
              date={convertDigitInString(bannerData[0]?.date?.split("T")[0])}
            />
          </div>
        )}
        <div className="main-div--profile row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <legend className="text-info">Organization Profile.</legend>
                <div class="form-row">
                  {currentOrganization.length > 0 ? (
                    <div class="col-md-12">
                      <div class="form-row">
                        <div className="col-md-6">
                          <div>
                            <label for="name" className="label w-25">
                              Name:
                            </label>
                            {account_type ===
                            process.env.REACT_APP_AccountType0 ? (
                              <span className="org_name">
                                {currentOrganization[0].user_name}
                              </span>
                            ) : (
                              <span
                                className="org_name"
                                onClick={handleViewOrganization}
                              >
                                {currentOrganization[0].user_name}
                              </span>
                            )}
                          </div>
                          <div>
                            <label for="email" className="label w-25">
                              Email:
                            </label>
                            <span>{currentOrganization[0].email}</span>
                          </div>
                          <div>
                            <label for="levy_no" className="label w-25">
                              Levy RegNo:
                            </label>
                            <span>{currentOrganization[0].levy_no}</span>
                          </div>
                          <div>
                            <label for="box" className="label w-25">
                              P.O. Box:
                            </label>
                            <span>{currentOrganization[0].box}</span>
                          </div>
                          <div>
                            <label for="code" className="label w-25">
                              Code:
                            </label>
                            <span>{currentOrganization[0].code}</span>
                          </div>
                          <div>
                            <label for="phone" className="label w-25">
                              Phone/Fax:
                            </label>
                            <span>{currentOrganization[0].phone}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <label for="town" className="label w-25">
                              Town:
                            </label>
                            <span>{currentOrganization[0].town}</span>
                          </div>
                          <div>
                            <label for="street" className="label w-25">
                              Street:
                            </label>
                            <span>{currentOrganization[0].street}</span>
                          </div>
                          <div>
                            <label for="building" className="label w-25">
                              Building:
                            </label>
                            <span>{currentOrganization[0].building}</span>
                          </div>
                          <div>
                            <label for="floor" className="label w-25">
                              Floor:
                            </label>
                            <span>{currentOrganization[0].floor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <FetchingData />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-div--course-details row mt-4">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <legend className="text-info">
                  Details of the course applied for.
                </legend>
                <div class="form-row">
                  <div class="col-md-6">
                    <div>
                      <label for="course_title" className="label w-25">
                        Course title:
                      </label>
                      <span>{record.course_title}</span>
                    </div>
                    <div>
                      <label for="provider" className="label w-25">
                        Training provider:
                      </label>
                      <span>{record.training_provider}</span>
                    </div>
                    <div>
                      <label for="venue" className="label w-25">
                        Course venue:
                      </label>
                      <span>{record.course_venue}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div>
                      <label className="label w-25">Country:</label>
                      <span>{record.country}</span>
                    </div>
                    <div>
                      <label className="label w-25">State:</label>
                      <span>{record.state}</span>
                    </div>
                    <div>
                      <label className="label w-25">City:</label>
                      <span>{record.city}</span>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12">
                    <label for="course_objectives" className="label">
                      Course objectives:
                    </label>
                    <span className="span--block">
                      {record.course_objectives}
                    </span>
                  </div>
                </div>
                {applicationDates !== null ? (
                  <div class="form-row">
                    {getNumberOfGroups().map((idx) => (
                      <>
                        <div class="col-md-6">
                          <label for="course_objectives" className="label">
                            {getNumberOfGroups().length > 1
                              ? `Group ${idx} start date:`
                              : `Start date:`}
                          </label>
                          <span className="span--block">
                            {convertDigitInString(
                              applicationDates[idx - 1].start_date.split("T")[0]
                            )}
                          </span>
                        </div>
                        <div class="col-md-6">
                          <label for="course_objectives" className="label">
                            {getNumberOfGroups().length > 1
                              ? `Group ${idx} end date:`
                              : `End date:`}
                          </label>
                          <span className="span--block">
                            {convertDigitInString(
                              applicationDates[idx - 1].end_date.split("T")[0]
                            )}
                          </span>
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <FetchingData />
                )}
                <div class="form-row">
                  <div class="col-md-6">
                    <div>
                      <label for="admission" className="label">
                        Course proposal or admission letter:
                      </label>
                      <a href="#">{record.admission_letter}</a>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div>
                      <label for="contents" className="label">
                        Course contents and timetable:
                      </label>
                      <a href="#">{record.course_contents}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {record.type_of_training === constants.OVER_SEAS && (
          <div className="main-div--overseas-requirements row mt-4">
            <div className="col-md-12">
              <legend className="text-info">
                Regional/Overseas training additional requirements.
              </legend>
              <div class="form-row">
                <div class="col-md-6">
                  <div>
                    <label className="label">
                      Is the course available locally?
                    </label>
                    <span>{record.available_locally === 0 ? "No" : "Yes"}</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div>
                    <label for="employment_date" className="label">
                      Date of employment:
                    </label>
                    <span>
                      {convertDigitInString(
                        record.date_of_employment.split("T")[0]
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12">
                  <div>
                    <label
                      for="trainer_employer_relationship"
                      className="label"
                    >
                      Does the trainer have any business connection with the
                      Employer/Applicant?
                    </label>
                    <span>
                      {record.trainer_employer_relationship === 0
                        ? "No"
                        : "Yes"}
                    </span>
                  </div>
                  <div class="col-md-12">
                    <label
                      for="trainer_employer_relationship_details"
                      className="label"
                    >
                      The organization name:
                    </label>
                    <span>
                      {record.related_organization_name === null
                        ? "N/A"
                        : record.related_organization_name}
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12">
                  <div>
                    <label for="other_organization_funds" className="label">
                      Is any other organization funding the training?
                    </label>
                    <span>
                      {record.other_organization_funding === 0 ? "No" : "Yes"}
                    </span>
                  </div>
                  <div class="col-md-12">
                    <label
                      for="other_organization_funds_details"
                      className="label"
                    >
                      The organization name:
                    </label>
                    <span>
                      {record.organization_funding_name === null
                        ? "N/A"
                        : record.organization_funding_name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="main-div--training-expenses row mt-4">
          <div className="col-md-12">
            <legend className="text-info">Training expenses.</legend>
            <>
              <div class="form-row">
                <div class="col-md-6">
                  <label for="tuition_fees" className="label w-50">
                    Tuition fees:
                  </label>
                  <span>{addComma(record.tuition_fees)}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="examination" className="label w-50">
                    Examination fees:
                  </label>
                  <span>{addComma(record.examination_fees)}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6">
                  <label for="books" className="label w-50">
                    Study materials:
                  </label>
                  <span>{addComma(record.study_materials_fees)}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6">
                  <label for="examination" className="label w-50">
                    Accomodation and meals:
                  </label>
                  <span>{addComma(record.accomodation_and_meals_fees)}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6">
                  <label for="fare" className="label w-50">
                    Air fare/ bus fare/ mileage:
                  </label>
                  <span>{addComma(record.bus_fare_fees)}</span>
                </div>
              </div>
              {record.other_expenses && (
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="others" className="label w-50">
                      Others:
                    </label>
                    <span>{addComma(record.other_expenses)}</span>
                  </div>
                </div>
              )}
              {record.other_expenses && (
                <div class="form-row">
                  <div class="col-md-6 form-group">
                    <label for="others" className="label w-50">
                      Other expenses details:
                    </label>
                    <span>{record.other_expenses_details}</span>
                  </div>
                </div>
              )}
              <div class="form-row">
                <div class="col-md-6 form-group">
                  <label for="others" className="label w-50">
                    Support document:
                  </label>
                  <a href="#">{record.support_document}</a>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 form-group">
                  <label for="total" className="label w-50">
                    TOTAL COST :
                  </label>
                  <span className="font-weight-bold">
                    {addComma(record.total_cost)}
                  </span>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="main-div--hr_manager row mt-4">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <legend className="text-info">Authorizing officer.</legend>
                {applicationHR !== null ? (
                  <div class="form-row">
                    <div class="col-md-3">
                      <label className="label">ID Number: </label>{" "}
                      <label>{applicationHR[0]?.national_id_number}</label>
                    </div>
                    <div class="col-md-3">
                      <label className="label">Names: </label>{" "}
                      <label>{applicationHR[0]?.first_name}</label>
                      {"  "}
                      <label>{applicationHR[0]?.last_name}</label>
                    </div>
                    <div class="col-md-3">
                      <label className="label">His National ID: </label>{" "}
                      <a href="">{applicationHR[0]?.id_pdf}</a>
                    </div>
                  </div>
                ) : (
                  <FetchingData />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main-div--selected-nominees row mt-4">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    {getNumberOfGroups().length > 1 &&
                      getNumberOfGroups().map((idx) => (
                        <Tag>
                          <a>
                            Group {idx}
                            {", "}
                            {
                              getFilteredNominees().filter(
                                (n) => Number(n?.group_id) === idx
                              ).length
                            }
                            {" nominees"}
                          </a>
                        </Tag>
                      ))}
                    <Tag>
                      <a>{`All Nominees, (${getFilteredNominees().length})`}</a>
                    </Tag>
                  </div>
                </div>
                <legend className="text-info">Selected nominees.</legend>
                {getNumberOfGroups().map((idx) => (
                  <div class="form-row" key={idx}>
                    {getNumberOfGroups().length > 1 && <p>Group {idx}</p>}
                    <div class="col-md-12">
                      <div className="row overflow-auto mt-0">
                        {/* {getFilteredNominees()
                          .filter((n) => Number(n?.group_id) === idx)
                          .map((n) => (
                            <div key={n.id} className="col-md-4">
                              <NomineeCard
                                nominee={n}
                                component="view_nominee"
                              />
                            </div>
                          ))} */}
                        <div key={idx + 5} className="col-md-9">
                          <Table
                            dataSource={addSerialNumber(
                              getFilteredNominees().filter(
                                (n) => Number(n?.group_id) === idx
                              ),
                              status.All
                            )}
                            columns={columns}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewApplicationDetails;
