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

const PendingApplications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { applications } = useSelector((state) => state.admin);
  const { account_type } = useSelector((state) => state.auth.user_data);
  console.log("all", applications);

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
      dataIndex: "user_name",
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
      dataIndex: "admin_on_it",
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
          account_type === process.env.REACT_APP_AccountType2
            ? status.Stage_1
            : status.Pending
        )}
      />
    </DefaultLayout>
  );
};

export default PendingApplications;
