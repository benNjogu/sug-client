import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import Spinner from "./../../components/spinner";
import { FetchAllApplications } from "../../redux/slices/admin";
import { addSerialNumber, status } from "./../../utils/addSerialNumber";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";
import { constants } from "../../data/constants";

const PendingApplications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let { applications } = useSelector((state) => state.admin);
  const { account_type } = useSelector((state) => state.auth.user_data);

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
      title: "Action",
      dataIndex: "id",
      render: (id, record) =>
        record.approved === "Rejected" ? (
          <div className="d-flex justify-content-around">
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ) : record.approved === "Pending" ? (
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

  if (account_type === process.env.REACT_APP_AccountType2)
    applications = applications.filter(
      (a) => a.approved === status.Stage_1 || a.approved === status.Pending
    );

  useEffect(() => {
    dispatch(FetchAllApplications());
  }, []);

  return (
    <DefaultLayout>
      {<Spinner loading={loading} />}

      <Table
        columns={columns}
        dataSource={addSerialNumber(
          applications,
          account_type === process.env.REACT_APP_AccountType3
            ? status.Stage_2
            : account_type === process.env.REACT_APP_AccountType2
            ? status.All
            : status.Pending
        )}
      />
    </DefaultLayout>
  );
};

export default PendingApplications;
