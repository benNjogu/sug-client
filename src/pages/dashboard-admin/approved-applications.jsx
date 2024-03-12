import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import MineAllBtns from "../../components/mine-all-btns/mine-all-btns.component";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";
import { addSerialNumber, status } from "../../utils/addSerialNumber";
import Spinner from "../../components/spinner";

const ApprovedApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("btn1");
  const [approvedApplications, setApprovedApplications] = useState([]);
  let my_id = window.localStorage.getItem("user_id");
  let { approved_applications } = useSelector((state) => state.admin);
  const { account_type } = useSelector((state) => state.auth.user_data);

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

  const handleViewApplication = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", { state: { record } });
    }, 700);
  };

  const handleShowMine = () => {
    // get all of my approved applications
    if (account_type === process.env.REACT_APP_AccountType1) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_1) === Number(my_id)
      );
      setApprovedApplications(approved_applications);
    }
    if (account_type === process.env.REACT_APP_AccountType2) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_2) === Number(my_id)
      );
      setApprovedApplications(approved_applications);
    }
    setSelected("btn1");
  };

  const handleShowAll = () => {
    setApprovedApplications(approved_applications);
    setSelected("btn2");
  };

  useEffect(() => {
    // get all of my approved applications
    if (account_type === process.env.REACT_APP_AccountType1) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_1) === Number(my_id)
      );

      setApprovedApplications(approved_applications);
    }

    if (account_type === process.env.REACT_APP_AccountType2) {
      approved_applications = approved_applications.filter(
        (application) => Number(application.level_2) === Number(my_id)
      );

      setApprovedApplications(approved_applications);
    }
    setSelected("btn1");
    // setApprovedApplications(approved_applications);
  }, []);

  return (
    <DefaultLayout>
      <MineAllBtns
        btn1Text={"Mine"}
        btn2Text={"All"}
        selected={selected}
        onClickBtn1={handleShowMine}
        onClickBtn2={handleShowAll}
      />

      <Spinner loading={loading} />

      <Table
        className="mt-3"
        columns={columns}
        dataSource={addSerialNumber(approvedApplications, status.All)}
      />
    </DefaultLayout>
  );
};

export default ApprovedApplications;
