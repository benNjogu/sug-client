import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";
import CustomTabs from "../../components/tabs/tabs.component";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner";
import { addSerialNumber, status } from "../../utils/addSerialNumber";
import { FetchAllDefferredAndRejectedApplications } from "../../redux/slices/admin";

const DefferedApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("btn1");
  const [deffereddApplications, setDeffereddApplications] = useState([]);
  let my_id = window.localStorage.getItem("user_id");
  let { defferred_rejected_applications } = useSelector((state) => state.admin);
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

  const handleShowMine = () => {
    // get all of my defferred applications
    // if (account_type === process.env.REACT_APP_AccountType2) {
    defferred_rejected_applications = defferred_rejected_applications.filter(
      (application) =>
        Number(application.admin_id) === Number(my_id) &&
        Number(application.approved) === status.Deffered
    );
    setDeffereddApplications(defferred_rejected_applications);
    // }
    // if (account_type === process.env.REACT_APP_AccountType2) {
    //   defferred_rejected_applications = defferred_rejected_applications.filter(
    //     (application) =>
    //       Number(application.admin_id) === Number(my_id) &&
    //       Number(application.approved) === status.Deffered
    //   );
    //   setDeffereddApplications(defferred_rejected_applications);
    // }
    setSelected("btn1");
  };

  const handleViewApplication = (record) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", { state: { record } });
    }, 700);
  };

  const handleShowAll = () => {
    setDeffereddApplications(
      defferred_rejected_applications.filter(
        (application) => Number(application.approved) === status.Deffered
      )
    );
    setSelected("btn2");
  };

  useEffect(() => {
    dispatch(FetchAllDefferredAndRejectedApplications());

    // get all of my defferred applications
    // if (account_type === process.env.REACT_APP_AccountType1) {
    defferred_rejected_applications = defferred_rejected_applications.filter(
      (application) =>
        Number(application.admin_id) === Number(my_id) &&
        Number(application.approved) === status.Deffered
    );

    setDeffereddApplications(defferred_rejected_applications);
    // }

    // if (account_type === process.env.REACT_APP_AccountType2) {
    //   defferred_rejected_applications = defferred_rejected_applications.filter(
    //     (application) =>
    //       Number(application.admin_id) === Number(my_id) &&
    //       Number(application.approved) === status.Deffered
    //   );

    //   setDeffereddApplications(defferred_rejected_applications);
    // }
    setSelected("btn1");
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

      <Table
        className="mt-3"
        columns={columns}
        dataSource={addSerialNumber(deffereddApplications, status.All)}
      />
    </DefaultLayout>
  );
};

export default DefferedApplications;
