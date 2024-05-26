import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import moment from "moment";

import DefaultLayout from "../../../components/default-layout/default-layout.component";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import { convertDigitInString } from "../../../utils/convertDigitsInString";
import Spinner from "../../../components/spinner";
import { constants } from "../../../data/constants";

const Pending = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { applications } = useSelector((state) => state.application);

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
      title: "Provider",
      dataIndex: "training_provider",
    },
    {
      title: "Date Applied",
      dataIndex: "date_applied",
      render(text, record) {
        return {
          children: <div>{`${moment(text).format("Do MM, YYYY")}`}</div>,
        };
      },
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
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <EyeOutlined
            className="mx-2"
            onClick={() => handleViewApplication(record)}
          />
          <EditOutlined
            className="mx-2"
            onClick={() => handleEditApplication(record)}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDeleteApplication(record)}
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

  const handleEditApplication = (record) => {
    console.log("edit application", record);
  };

  const handleDeleteApplication = (record) => {
    console.log("delete application", record);
  };

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      <Table
        columns={columns}
        dataSource={addSerialNumber(applications, status.Pending)}
      />
    </DefaultLayout>
  );
};

export default Pending;
