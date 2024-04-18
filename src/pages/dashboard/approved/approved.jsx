import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "../../../components/default-layout/default-layout.component";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import { convertDigitInString } from "./../../../utils/convertDigitsInString";
import Spinner from "../../../components/spinner";
import ApprovalLetter from "../../../components/approval-letter/approval-letter.component";

const Approved = () => {
  const [loading, setLoading] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const navigate = useNavigate();
  const { applications } = useSelector((state) => state.application);

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Course",
      dataIndex: "course_title",
    },
    {
      title: "Date Applied",
      dataIndex: "date_applied",
      render(text, record) {
        return {
          children: <div>{convertDigitInString(text.split("T")[0])}</div>,
        };
      },
    },
    {
      title: "Approval Letter",
      dataIndex: "approval_letter",
      render(text, record) {
        return {
          props: {
            style: {
              color: "#1e90ff",
              fontWeight: 600,
              cursor: "pointer",
            },
          },
          children: <div onClick={handleViewLetter}>{text}</div>,
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
            onClick={() => handleViewApplication(record)}
          />
        </div>
      ),
    },
  ];

  const handleViewApplication = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", { state: { record } });
    }, 700);
  };

  const handleViewLetter = () => {
    console.log("first");
    setShowLetterModal(true);
  };

  const handleCancel = () => {
    setShowLetterModal(false);
  };

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      {showLetterModal && (
        <Modal
          open={showLetterModal}
          title={`Approval Letter`}
          width={1000}
          centered
          onCancel={handleCancel}
          footer={false}
        >
          {<ApprovalLetter handleClose={handleCancel} />}
        </Modal>
      )}

      <Table
        columns={columns}
        dataSource={addSerialNumber(applications, status.Approved)}
      />
    </DefaultLayout>
  );
};

export default Approved;
