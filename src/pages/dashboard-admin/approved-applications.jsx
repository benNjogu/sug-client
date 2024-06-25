import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";
import { addSerialNumber, status } from "../../utils/addSerialNumber";
import Spinner from "../../components/spinner";
import CustomTabs from "../../components/tabs/tabs.component";
import {
  FetchAllApplications,
  FetchAllApprovedApplications,
} from "../../redux/slices/admin";
import { constants } from "../../data/constants";
import ApprovalLetter from "../../components/approval-letter/approval-letter.component";
import { FetchApplicationDetails } from "../../redux/slices/application";

const ApprovedApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { account_type } = useSelector((state) => state.auth.user_data);
  const [selected, setSelected] = useState(
    account_type === process.env.REACT_APP_AccountType1 ? "btn2" : "btn1"
  );
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [letterData, setLetterData] = useState(null);
  let my_id = window.localStorage.getItem("user_id");
  let { approved_applications } = useSelector((state) => state.admin);
  let { applications } = useSelector((state) => state.admin);

  // This two should be extracted to one; later;
  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Organization",
      dataIndex: "org_name",
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
                  : record.approved === constants.STAGE_2
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
      title: "Date of application",
      dataIndex: "date_applied",
      render(text, record) {
        return {
          children:
            record.date_applied !== null ? (
              <div>
                {convertDigitInString(record.date_applied.split("T")[0])}
                {", "}
                {getTime(record.date_applied)}
              </div>
            ) : (
              ""
            ),
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

  const approved_application_columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Organization",
      dataIndex: "org_name",
    },
    {
      title: "Course",
      dataIndex: "course_title",
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
          children: <div onClick={() => handleViewLetter(record)}>{text}</div>,
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
    let application = applications.filter(
      (a) => a.id === record.application_id
    );

    dispatch(FetchApplicationDetails(record.application_id));

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", {
        state: {
          record:
            application.length === 0
              ? record
              : { ...application[0], approved: record.approved },
        },
      });
    }, 700);
  };

  const handleViewLetter = (record) => {
    console.log("record letter", record);
    setLetterData(record);
    setShowLetterModal(true);
  };

  const handleCancel = () => {
    setShowLetterModal(false);
  };

  const handleShowMine = () => {
    // get all of my approved applications
    if (account_type === process.env.REACT_APP_AccountType1) {
      approved_applications = applications.filter(
        (application) => Number(application.level_a) === Number(status.Stage_1)
      );
      setApprovedApplications(approved_applications);
    }
    if (account_type === process.env.REACT_APP_AccountType2) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_1) === Number(my_id)
      );
      setApprovedApplications(approved_applications);
    }
    if (account_type === process.env.REACT_APP_AccountType3) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_2) === Number(my_id)
      );
      setApprovedApplications(approved_applications);
    }
    setSelected("btn1");
  };

  const handleShowAll = () => {
    if (account_type === process.env.REACT_APP_AccountType1) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.approved) === status.Approved
      );
    }
    if (account_type === process.env.REACT_APP_AccountType2) {
      approved_applications = approved_applications.filter(
        (application) =>
          Number(application.approved) === status.Stage_1 ||
          Number(application.approved) === status.Approved
      );
    }
    if (account_type === process.env.REACT_APP_AccountType3) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.approved) === status.Approved
      );
    }
    setApprovedApplications(approved_applications);
    setSelected("btn2");
  };

  useEffect(() => {
    dispatch(FetchAllApplications());

    dispatch(FetchAllApprovedApplications());

    if (account_type === process.env.REACT_APP_AccountType1) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.approved) === status.Approved
      );

      setApprovedApplications(approved_applications);
      setSelected("btn2");
    } else {
      setSelected("btn1");
    }

    // get all of my approved applications
    if (
      account_type === process.env.REACT_APP_AccountType1 &&
      selected === "btn1"
    ) {
      approved_applications = applications.filter(
        (application) => Number(application.level_a) === Number(status.Stage_1)
      );
      setApprovedApplications(approved_applications);
    }

    if (account_type === process.env.REACT_APP_AccountType2) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_1) === Number(my_id)
      );

      setApprovedApplications(approved_applications);
    }

    if (account_type === process.env.REACT_APP_AccountType3) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_2) === Number(my_id)
      );

      setApprovedApplications(approved_applications);
    }
  }, []);

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      <CustomTabs
        btn1Text={"Mine"}
        btn2Text={"All"}
        selected={selected}
        onClickBtn1={handleShowMine}
        onClickBtn2={handleShowAll}
      />

      {showLetterModal && (
        <Modal
          open={showLetterModal}
          title={`Approval Letter`}
          width={1000}
          centered
          onCancel={handleCancel}
          footer={false}
        >
          {
            <ApprovalLetter
              handleClose={handleCancel}
              letter_data={letterData}
            />
          }
        </Modal>
      )}

      <Table
        className="mt-3"
        columns={
          account_type === process.env.REACT_APP_AccountType1 &&
          selected === "btn2"
            ? approved_application_columns
            : columns
        }
        dataSource={addSerialNumber(approvedApplications, status.All)}
      />
    </DefaultLayout>
  );
};

export default ApprovedApplications;
