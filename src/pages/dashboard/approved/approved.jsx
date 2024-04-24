import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "../../../components/default-layout/default-layout.component";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import { convertDigitInString } from "./../../../utils/convertDigitsInString";
import Spinner from "../../../components/spinner";
import ApprovalLetter from "../../../components/approval-letter/approval-letter.component";
import {
  FetchOrganizationApplications,
  GetApprovedApplicationsByOrg,
} from "../../../redux/slices/application";
import { constants } from "../../../data/constants";
import CustomTabs from "../../../components/tabs/tabs.component";

import "./approved.styles.css";

const Approved = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [letterData, setLetterData] = useState(null);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [selected, setSelected] = useState("btn1");
  const { applications } = useSelector((state) => state.application);
  const { orgApprovedApplications } = useSelector((state) => state.application);

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

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", {
        state: { record: { ...application[0], approved: constants.APPROVED } },
      });
    }, 700);
  };

  const handleViewLetter = (record) => {
    setLetterData(record);
    setShowLetterModal(true);
  };

  const handleCancel = () => {
    setShowLetterModal(false);
  };

  const handleShowApproveApplications = () => {
    setSelected("btn1");
  };

  const handleReimbursmentDetails = () => {
    setSelected("btn2");
  };

  const getYear = () => {
    let current_year = new Date();

    return current_year.getFullYear();
  };

  useEffect(() => {
    if (orgApprovedApplications.length === 0) {
      dispatch(
        GetApprovedApplicationsByOrg(window.localStorage.getItem("user_id"))
      );
    }

    if (applications.length === 0) {
      dispatch(FetchOrganizationApplications());
    }
  }, []);

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      <div className="mb-3">
        <CustomTabs
          btn1Text={"Approved applications"}
          btn2Text={"Reimbursment details"}
          selected={selected}
          onClickBtn1={handleShowApproveApplications}
          onClickBtn2={handleReimbursmentDetails}
        />
      </div>

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

      {selected === "btn1" ? (
        <Table
          columns={columns}
          dataSource={addSerialNumber(orgApprovedApplications, status.All)}
        />
      ) : (
        <div className="details">
          <p>
            Upon undertaking of the training as approved, you will be expected
            to make a claim for reimbursement of training expenses. The claim
            for reimbursement should be done in triplicate using the claim form
            for reimbursement <b>(NITA/F&CC/F/02)</b> available in our website{" "}
            <a href="http://www.nita.go.ke" target="_blank" className="p-text">
              www.nita.go.ke
            </a>
            . The following documents should be attached:
            <ul className="details__list-bold">
              <li>Evidence of undertaking training and completion</li>
              <li>
                Original relevant payment receipts for the training undertaken
              </li>
              <li>A covering letter signed by the authorized officer</li>
              <li>A copy of NITA approval letter</li>
            </ul>
          </p>
          <p>
            Please note reimbursements are now expedited and capped at 200% of
            levy contribution by each employer in the previous year.
            Consequently, the maximum reimbursable amounts (as guided by table{" "}
            <b>a</b> and <b>b</b> below) within a year for all trainings
            undertaken cumulatively cannot exceed 200% of your levy contribution
            in the previous year.
          </p>
          <p>
            You will claim reimbursement expenses for the same as provided for
            by the following guidelines:
          </p>
          <p>
            <span className="details__sub-title">
              a) Approved training offered by NITA registered/accredited Public
              Training Institutions
            </span>
            <table className="details-table">
              <thead>
                <tr>
                  <th className="details-th">Training Institution</th>
                  <th className="details-th">No.</th>
                  <th className="details-th">Tuition & Examination Fees</th>
                  <th className="details-th">Subsistence Allowance</th>
                  <th className="details-th">Travelling Expenses</th>
                </tr>
              </thead>
              <tbody>
                <tr className="details-tr">
                  <td className="details-td">A</td>
                  <td className="details-td">
                    Government Training Institutions including: NITA Centers,
                    KSG, TVET Institutions and National Polytechnics
                  </td>
                  <td className="details-td" rowSpan={3}>
                    Full
                  </td>
                  <td className="details-td" rowSpan={3}>
                    Full-board accommodation in the Training Institution or
                    equivalent.
                  </td>
                  <td className="details-td" rowSpan={3}>
                    <ul>
                      <li>
                        Cost of travelling not exceeding return fare for normal
                        regular road/rail trasport at the begining and end of a
                        training session
                      </li>
                      <li>
                        Chargeable element of Training Institution organised
                        transport shall be reimbursed in full
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">B</td>
                  <td className="details-td">
                    Local public Universities for recognized for recognized
                    courses as approved by the Board
                  </td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">C</td>
                  <td className="details-td">
                    Local Branches of ESAMI{" "}
                    <i>(Eastern and Southern African Management Institution)</i>
                  </td>
                </tr>
              </tbody>
            </table>
          </p>
          <p className="mt-3">
            <span className="details__sub-title">
              b) Approved training offered by other NITA registered/accredited
              Training Providers
            </span>
            <table className="details-table">
              <thead>
                <tr className="details-tr">
                  <th className="details-th">No.</th>
                  <th className="details-th">Item</th>
                  <th className="details-th">
                    Maximum Reimbursement Rate & Reimbursable
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="details-tr">
                  <td className="details-td" rowSpan={2}>
                    A
                  </td>
                  <td className="details-td" rowSpan={2}>
                    <b>Open-House Management and Supervisory Courses</b>
                  </td>
                  <td className="details-td">
                    <span className="block__span">
                      <b>Non-Residential</b>
                    </span>{" "}
                    <span className="block__span">
                      <b>Up to Kshs.55,000</b>/= per course week per participant{" "}
                      <b>or</b>
                    </span>
                    <span className="block__span">
                      <b>Kshs.11,000</b>/= per course day per participant
                    </span>
                  </td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">
                    <span className="block__span">
                      <b>Residential</b>
                    </span>{" "}
                    <span className="block__span">
                      <b>Up to Kshs.65,000</b>/= per course week per participant{" "}
                      <b>or</b>
                    </span>
                    <span className="block__span">
                      <b>Kshs.13,000</b>/= per course day per participant
                    </span>
                  </td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td" rowSpan={2}>
                    B
                  </td>
                  <td className="details-td" rowSpan={2}>
                    <b>In-House Management and Supervisory Courses</b>
                  </td>
                  <td className="details-td">
                    <span className="block__span">
                      <b>Conducted within the employer's premises</b>
                    </span>{" "}
                    <span className="block__span">
                      <b>Up to Kshs.26,000</b>/= per course week per participant{" "}
                      <b>or</b>
                    </span>
                    <span className="block__span">
                      <b>Kshs.5,200</b>/= per course day per participant
                    </span>
                  </td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">
                    <span className="block__span">
                      <b>Conducted outside employer's premises</b>
                    </span>{" "}
                    <span className="block__span">
                      <b>Up to Kshs.36,500</b>/= per course week per participant{" "}
                      <b>or</b>
                    </span>
                    <span className="block__span">
                      <b>Kshs.7,300</b>/= per course day per participant
                    </span>
                  </td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">C</td>
                  <td className="details-td">
                    <b>Regional & overseas Courses</b>
                  </td>
                  <td className="details-td">
                    <ul>
                      <li>
                        Full Tuition and examination fee for a minimum of 2
                        weeks
                      </li>
                      <li>
                        Full accommodation expenses chargeable by the training
                        institution for a minimum of 2 weeks
                      </li>
                    </ul>
                    <p>
                      <b>
                        <i>
                          For training provided by supplier of equipment,
                          parent/ sister company only return economy air-fare or
                          rail expenses at the beginning and end of the training
                          session will be reimbursed
                        </i>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">D</td>
                  <td className="details-td">
                    <b>Travelling expenses</b>
                  </td>
                  <td className="details-td">
                    <p>
                      Return Economy air fare (Regional & Overseas), Rail or
                      Public Transport Fares (Local) only at the beginning and
                      end of the training session
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </p>
          <p className="mt-3">
            <span className="details__sub-title">
              c) 2024 Programme for Submission of Reimbursement Claims.
            </span>
            <table className="details-table">
              <thead>
                <tr className="details-tr">
                  <th className="details-th">
                    Training approved and undertaken between:
                  </th>
                  <th className="details-th">
                    Fully supported claims to be submitted by:
                  </th>
                  <th className="details-th">
                    Estimated date of paying the reimbursement claim
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="details-tr">
                  <td className="details-td">January - March {getYear()}</td>
                  <td className="details-td">30th April, {getYear()}</td>
                  <td className="details-td">31st May, {getYear()}</td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">April - June {getYear()}</td>
                  <td className="details-td">31st July, {getYear()}</td>
                  <td className="details-td">31st August, {getYear()}</td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">July - September {getYear()}</td>
                  <td className="details-td">31st October, {getYear()}</td>
                  <td className="details-td">30th November, {getYear()}</td>
                </tr>
                <tr className="details-tr">
                  <td className="details-td">October - December {getYear()}</td>
                  <td className="details-td">31st January, {getYear() + 1}</td>
                  <td className="details-td">29th February, {getYear() + 1}</td>
                </tr>
              </tbody>
            </table>
          </p>
          <p className="mt-3">
            <span className="block__span">
              <b>d) NITA Policy on Training Ration:-</b>
            </span>
            The NITA policy is that for training of personal engaged in
            industry, the ratio should be 1:5 i.e. for every Supervisory and/or
            management staff nominated for training, you should nominate 5
            members of the lower cadres for training in any of the other
            training schemes offered by NITA (Skills-Up grading, Indentured
            Learnership or Apprenticeship). Please ensure that you adhere to
            this policy.
          </p>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Approved;
