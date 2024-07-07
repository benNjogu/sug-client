import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Table } from "antd";
import { useDownloadExcel } from "react-export-table-to-excel";

import { constants } from "../../../data/constants";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import Spinner from "../../../components/spinner";
import Navbar from "../../../components/navbar/navbar.component";
import "../organization-details/view-organization-details.styles.css";
import { useNavigate } from "react-router-dom";

const ViewReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mappableFields, setMappableFields] = useState([
    "s_no",
    "user_name",
    "county",
    "levy_no",
    "sector",
    "date_applied",
    "start_date",
    "end_date",
    "course_title",
    "training_provider",
    "course_venue",
    "total_cost",
    "number_of_participants",
    "all_nominees",
    "females",
    "males",
    "application_id",
    "group_id",
    "approved",
  ]);
  const [headings, setHeadings] = useState([
    "S_NO",
    "ORGANIZATION",
    "COUNTY",
    "REG. NO.",
    "SECTOR",
    "DATE RECEIVED",
    "START DATE",
    "END DATE",
    "COURSE",
    "TRAINING PROVIDER",
    "VENUE",
    "AMOUNT",
    "PARTICIPANTS",
    "NOMINEES",
    "FEMALES",
    "MALES",
    "APPLICATION_ID",
    "GROUP_ID",
    "STATUS",
  ]);

  const tableRef = useRef(null);

  let { reportData } = useSelector((state) => state.admin);

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "ORGANIZATION",
      dataIndex: "user_name",
    },
    {
      title: "COUNTY",
      dataIndex: "county",
    },
    {
      title: "REG. NO.",
      dataIndex: "levy_no",
    },
    {
      title: "SECTOR",
      dataIndex: "sector",
    },
    {
      title: "DATE RECEIVED",
      dataIndex: "date_applied",
      render(text, record) {
        return {
          children: (
            <div>{`${moment(record.date_applied).format(
              "Do MMMM, YYYY"
            )}`}</div>
          ),
        };
      },
    },
    {
      title: "START DATE",
      dataIndex: "start_date",
      render(text, record) {
        return {
          children: (
            <div>{`${moment(record.start_date).format("Do MMMM, YYYY")}`}</div>
          ),
        };
      },
    },
    {
      title: "END DATE",
      dataIndex: "end_date",
      render(text, record) {
        return {
          children: (
            <div>{`${moment(record.end_date).format("Do MMMM, YYYY")}`}</div>
          ),
        };
      },
    },
    {
      title: "COURSE",
      dataIndex: "course_title",
    },
    {
      title: "TRAINING PROVIDER",
      dataIndex: "training_provider",
    },
    {
      title: "VENUE",
      dataIndex: "course_venue",
    },
    {
      title: "AMOUNT",
      dataIndex: "total_cost",
    },
    {
      title: "PARTICIPANTS",
      dataIndex: "number_of_participants",
    },
    {
      title: "NOMINEES",
      dataIndex: "all_nominees",
    },
    {
      title: "FEMALES",
      dataIndex: "females",
    },
    {
      title: "MALES",
      dataIndex: "males",
    },
    {
      title: "APPLICATION_ID",
      dataIndex: "application_id",
    },
    {
      title: "GROUP_ID",
      dataIndex: "group_id",
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
  ];

  // nativeReportData is reportData modified for the native html table.
  let nativeReportData = addSerialNumber(reportData, status.All);

  for (let i = 0; i < nativeReportData.length; i++) {
    nativeReportData[i].start_date = moment(
      nativeReportData[i].start_date
    ).format("Do MMMM, YYYY");
    nativeReportData[i].end_date = moment(nativeReportData[i].end_date).format(
      "Do MMMM, YYYY"
    );
    nativeReportData[i].date_applied = moment(
      nativeReportData[i].date_applied
    ).format("Do MMMM, YYYY");
  }

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "sug report",
    sheet: "report",
  });

  const handleBackpressed = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar
        title={"Report"}
        reportPage={true}
        handleExportReport={onDownload}
        handleBackpressed={handleBackpressed}
      />
      <Spinner loading={loading} />
      <div className="main-container">
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="native-table">
              <table ref={tableRef}>
                <tr>
                  {headings.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
                {nativeReportData.map((data, index) => (
                  <tr key={index}>
                    {mappableFields.map((header, idx) => (
                      <td key={idx}>{data[header]}</td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
            <Table
              columns={columns}
              dataSource={addSerialNumber(reportData, status.All)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewReport;
