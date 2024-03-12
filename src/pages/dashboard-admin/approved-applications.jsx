import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import MineAllBtns from "../../components/mine-all-btns/mine-all-btns.component";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";
import { addSerialNumber, status } from "../../utils/addSerialNumber";

const ApprovedApplications = () => {
  const [selected, setSelected] = useState("btn1");
  const [approvedApplications, setApprovedApplications] = useState([]);
  const dispatch = useDispatch();
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
      dataIndex: "organization_id",
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

  const handleViewApplication = (record) => {};

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
    setSelected("btn2");
  };

  const handleShowAll = () => {
    setApprovedApplications(approved_applications);
    setSelected("btn1");
  };

  useEffect(() => {
    setApprovedApplications(approved_applications);
  }, []);

  return (
    <DefaultLayout>
      <MineAllBtns
        btn1Text={"All"}
        btn2Text={"Mine"}
        selected={selected}
        onClickBtn1={handleShowAll}
        onClickBtn2={handleShowMine}
      />

      <Table
        className="mt-3"
        columns={columns}
        dataSource={addSerialNumber(approvedApplications, status.All)}
      />
    </DefaultLayout>
  );
};

export default ApprovedApplications;
