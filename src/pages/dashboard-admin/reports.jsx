import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table, message } from "antd";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import Spinner from "../../components/spinner";
import { constants } from "../../data/constants";
import GenerateReportModal from "../../components/modal/generate-report-modal.component";
import SearchBox from "../../components/search-box";
import DataCard from "../../components/analytics-data-items/data-card.component";
import { addSerialNumber, status } from "../../utils/addSerialNumber";
import {
  FetchAllAdmins,
  FetchAllApplications,
  FetchAllApprovedApplications,
  FetchAllDefferredAndRejectedApplications,
  FetchAllNominees,
  GenerateReport,
} from "../../redux/slices/admin";

const Reports = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(null);

  let { organizations } = useSelector((state) => state.organization);
  let { applications } = useSelector((state) => state.admin);

  let { approved_applications } = useSelector((state) => state.admin);
  let { defferred_rejected_applications } = useSelector((state) => state.admin);
  let { nominees } = useSelector((state) => state.admin);
  let { admins } = useSelector((state) => state.admin);

  approved_applications = approved_applications.filter(
    (application) => Number(application.approved) === status.Approved
  );
  let defferred_applications = defferred_rejected_applications.filter(
    (application) => Number(application.approved) === status.Deffered
  );
  let rejected_applications = defferred_rejected_applications.filter(
    (application) => Number(application.approved) === status.Rejected
  );
  let pending_applications = applications.filter(
    (application) =>
      Number(application.approved) === status.Pending ||
      Number(application.approved) === status.Stage_1 ||
      Number(application.approved) === status.Stage_2
  );
  let IBTA_admins = admins.filter(
    (admin) =>
      admin.account_type === process.env.REACT_APP_AccountType1.toString() ||
      admin.account_type === process.env.REACT_APP_AccountType2.toString() ||
      admin.account_type === process.env.REACT_APP_AccountType3.toString()
  );

  // get data from various arrays
  let work = [];
  for (let i = 0; i < IBTA_admins.length; i++) {
    // get approved for i
    let admin_data = {};
    admin_data.name = IBTA_admins[i].user_name;
    admin_data.level = IBTA_admins[i].account_type;
    if (IBTA_admins[i].account_type === process.env.REACT_APP_AccountType1) {
      admin_data.approved_by = "-";
      admin_data.defferred = defferred_applications.filter(
        (application) => application.admin_id === IBTA_admins[i].user_id
      ).length;
      admin_data.rejected = rejected_applications.filter(
        (application) => application.admin_id === IBTA_admins[i].user_id
      ).length;
    }
    if (IBTA_admins[i].account_type === process.env.REACT_APP_AccountType2) {
      admin_data.approved_by = approved_applications.filter(
        (application) => application.level_1 === IBTA_admins[i].user_id
      ).length;
      admin_data.defferred = defferred_applications.filter(
        (application) => application.admin_id === IBTA_admins[i].user_id
      ).length;
      admin_data.rejected = rejected_applications.filter(
        (application) => application.admin_id === IBTA_admins[i].user_id
      ).length;
    }
    if (IBTA_admins[i].account_type === process.env.REACT_APP_AccountType3) {
      admin_data.approved_by = approved_applications.filter(
        (application) => application.level_2 === IBTA_admins[i].user_id
      ).length;
      admin_data.defferred = defferred_applications.filter(
        (application) => application.admin_id === IBTA_admins[i].user_id
      ).length;
      admin_data.rejected = rejected_applications.filter(
        (application) => application.admin_id === IBTA_admins[i].user_id
      ).length;
    }

    work.push(admin_data);
  }

  const admin_columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
    },
    {
      title: "Approved",
      dataIndex: "approved_by",
    },
    {
      title: "Defferred",
      dataIndex: "defferred",
    },
    {
      title: "Rejected",
      dataIndex: "rejected",
    },
  ];

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleChangeYear = (year) => {
    setYear(year);
  };

  const handleGenerateReport = () => {
    if (year === null) {
      return message.error("Enter Year");
    }

    if (!year.match(/^[0-9]+$/)) {
      return message.error("Enter valid Year");
    }

    let firstDigit = Math.floor(year / Math.pow(10, 3));
    if (year.toString().match(/\d/g).length > 4 || firstDigit !== 2) {
      return message.error("Enter valid Year");
    }

    dispatch(GenerateReport(year));
  };

  useEffect(() => {
    dispatch(FetchAllAdmins());
    dispatch(FetchAllNominees());
    dispatch(FetchAllApplications());
    dispatch(FetchAllApprovedApplications());
    dispatch(FetchAllDefferredAndRejectedApplications());
  }, []);

  return (
    <DefaultLayout>
      <div className="row d-flex justify-content-between">
        <div className="col-md-9">
          <SearchBox
            placeholder={"Enter year..."}
            value={year}
            onChange={handleChangeYear}
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary"
            style={{ marginBottom: 12 }}
            onClick={handleGenerateReport}
          >
            {constants.GENERATE_REPORT}
          </button>
        </div>
      </div>
      <Spinner loading={loading} />

      <div>
        {showModal && (
          <Modal
            open={showModal}
            title={"Report details."}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <GenerateReportModal
                handleClose={handleCancel}
                onGenerateReport={handleGenerateReport}
              />
            }
          </Modal>
        )}
        <div className="row d-flex justify-content-between">
          <div className="col-md-3">
            <DataCard
              value={organizations?.length}
              valueText={"Organizations"}
            />
          </div>
          <div className="col-md-3">
            <DataCard value={applications?.length} valueText={"Applications"} />
          </div>
          <div className="col-md-3">
            <DataCard value={nominees?.length} valueText={"Nominees"} />
          </div>
          <div className="col-md-3">
            <DataCard value={IBTA_admins?.length} valueText={"IBTA admins"} />
          </div>
        </div>
        <div className="row d-flex justify-content-between mt-3">
          <div className="col-md-3">
            <DataCard
              value={approved_applications?.length}
              valueText={"Approved"}
            />
          </div>
          <div className="col-md-3">
            <DataCard
              value={defferred_applications?.length}
              valueText={"Defferred"}
            />
          </div>
          <div className="col-md-3">
            <DataCard
              value={rejected_applications?.length}
              valueText={"Rejected"}
            />
          </div>
          <div className="col-md-3">
            <DataCard
              value={pending_applications?.length}
              valueText={"Pending"}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <Table
              style={{ width: 95 + "%" }}
              columns={admin_columns}
              dataSource={addSerialNumber(work, status.All)}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Reports;
