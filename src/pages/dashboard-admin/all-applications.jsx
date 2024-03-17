import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import {
  FetchAllApplications,
  FetchAllApprovedApplications,
  GetAdminData,
} from "../../redux/slices/admin";
import { addSerialNumber, status } from "./../../utils/addSerialNumber";
import { constants } from "../../data/constants";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";
import Spinner from "../../components/spinner";
import SearchBox from "../../components/search-box";

const AllApplications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchOrgName, setSearchOrgName] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchYear, setSearchYear] = useState("");
  let { applications } = useSelector((state) => state.admin);

  const handleViewApplication = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", { state: { record } });
    }, 700);
  };

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
      title: "Admin",
      dataIndex: "admin_name",
      render: (text, record) =>
        record.admin_name === null ? 0 : record.admin_name,
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

  const handleSearchOrgName = (query) => {
    setSearchOrgName(query);
  };

  const handleSearchCourse = (query) => {
    setSearchCourse(query);
  };

  const handleSearchYear = (query) => {
    setSearchYear(query);
  };

  // Searching from organization and/or course title and/or year.
  if (searchOrgName) {
    applications = applications.filter((a) =>
      a.org_name.toLowerCase().startsWith(searchOrgName.toLowerCase())
    );
  }
  if (searchCourse) {
    applications = applications.filter((a) =>
      a.course_title.toLowerCase().startsWith(searchCourse.toLowerCase())
    );
  }
  if (searchYear) {
    applications = applications.filter((a) =>
      a.date_applied
        .toString()
        .toLowerCase()
        .startsWith(searchYear.toLowerCase())
    );
  }

  useEffect(() => {
    dispatch(FetchAllApplications());
    dispatch(FetchAllApprovedApplications());
    // dispatch(FetchAllDefferedAndRejectedApplications())
    dispatch(GetAdminData());
  }, []);

  return (
    <DefaultLayout>
      <div className="row d-flex justify-content-between">
        <div className="col-md-4">
          <SearchBox
            placeholder={"Search organization name..."}
            value={searchOrgName}
            onChange={handleSearchOrgName}
          />
        </div>
        <div className="col-md-4">
          <SearchBox
            placeholder={"Search course title..."}
            value={searchCourse}
            onChange={handleSearchCourse}
          />
        </div>
        <div className="col-md-4">
          <SearchBox
            placeholder={"Search year..."}
            value={searchYear}
            onChange={handleSearchYear}
          />
        </div>
      </div>

      <Spinner loading={loading} />

      <Table
        className="mt-3"
        columns={columns}
        dataSource={addSerialNumber(applications, status.All)}
      />
    </DefaultLayout>
  );
};

export default AllApplications;
