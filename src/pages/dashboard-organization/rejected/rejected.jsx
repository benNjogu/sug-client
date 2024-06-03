import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";

import DefaultLayout from "../../../components/default-layout/default-layout.component";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import Spinner from "../../../components/spinner";
import { GetDefferredAndRejects } from "../../../redux/slices/organization";
import { constants } from "../../../data/constants";

const Rejected = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { applications } = useSelector((state) => state.application);
  const { defferred_and_rejects } = useSelector((state) => state.organization);
  console.log("ddfr", defferred_and_rejects);

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
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <div className="mx-2" />
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
        state: { record: { ...application[0], approved: constants.REJECTED } },
      });
    }, 700);
  };

  const handleEditApplication = (record) => {
    console.log("edit application", record);
  };

  useEffect(() => {
    dispatch(GetDefferredAndRejects());
  }, []);

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      <Table
        columns={columns}
        dataSource={addSerialNumber(defferred_and_rejects, status.Rejected)}
      />
    </DefaultLayout>
  );
};

export default Rejected;
