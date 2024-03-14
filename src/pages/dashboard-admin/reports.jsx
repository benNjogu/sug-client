import { useState } from "react";
import { Modal, Table } from "antd";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import Spinner from "../../components/spinner";
import { constants } from "../../data/constants";
import GenerateReportModal from "../../components/modal/generate-report-modal.component";

const Reports = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "From",
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
      title: "To",
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
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div className="">
          <Button
            text={constants.VIEW_REPORT}
            text_color={"text-success"}
            handleBtnClick={handleViewReport}
          />
        </div>
      ),
    },
  ];

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleGenerateReport = () => {};

  const handleViewReport = () => {};

  return (
    <DefaultLayout>
      <Spinner loading={loading} />

      <div>
        <button
          className="btn btn-primary"
          style={{ marginBottom: 12 }}
          onClick={handleShowModal}
        >
          {constants.GENERATE_REPORT}
        </button>
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
        <Table
          columns={columns}
          dataSource={
            []
            // addSerialNumber(applications, status.All)
          }
        />
      </div>
    </DefaultLayout>
  );
};

export default Reports;
