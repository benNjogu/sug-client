import { useState } from "react";
import { Modal, Table } from "antd";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import Spinner from "../../components/spinner";
import { constants } from "../../data/constants";
import GenerateReportModal from "../../components/modal/generate-report-modal.component";
import SearchBox from "../../components/search-box";
import DataCard from "../../components/analytics-data-items/data-card.component";
import AnalyticsTable from "./../../components/analytics-data-items/data-table.component";

const Reports = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterByYear, setFilterByYear] = useState("");
  const [activeRow, setActiveRow] = useState(false);
  let data = [
    { s_no: 1, date_given: "29-01-2024", current_date: "29-01-2024" },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "From",
      dataIndex: "date_given",
    },
    {
      title: "To",
      dataIndex: "current_date",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <div />
          <div />
          <div className="">
            <button class="btn btn-sm btn-outline-success" onClick={() => {}}>
              {constants.VIEW_REPORT}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleClickRow = (key) => {
    console.log(key);
    setActiveRow(!activeRow);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleFilterByYear = () => {};

  const handleGenerateReport = () => {};

  const handleViewReport = () => {};

  return (
    <DefaultLayout>
      <div className="row d-flex justify-content-between">
        <div className="col-md-9">
          <SearchBox
            placeholder={"Enter year..."}
            value={filterByYear}
            onChange={handleFilterByYear}
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary"
            style={{ marginBottom: 12 }}
            onClick={handleShowModal}
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
            <DataCard valueText={"Organizations"} />
          </div>
          <div className="col-md-3">
            <DataCard valueText={"Applications"} />
          </div>
          <div className="col-md-3">
            <DataCard valueText={"Nominees"} />
          </div>
          <div className="col-md-3">
            <DataCard valueText={"IBTA admins"} />
          </div>
        </div>
        <div className="row d-flex justify-content-between mt-3">
          <div className="col-md-3">
            <DataCard valueText={"Approved"} />
          </div>
          <div className="col-md-3">
            <DataCard valueText={"Defferred"} />
          </div>
          <div className="col-md-3">
            <DataCard valueText={"Rejected"} />
          </div>
          <div className="col-md-3">
            <DataCard valueText={"Pending"} />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <AnalyticsTable />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <Table
              style={{ width: 95 + "%" }}
              columns={columns}
              dataSource={
                data
                // addSerialNumber(applications, status.All)
              }
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Reports;
