import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import moment from "moment";

import DefaultLayout from "../../../components/default-layout/default-layout.component";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import Spinner from "../../../components/spinner";
import { constants } from "../../../data/constants";
import {
  DeleteApplicationById,
  FetchApplicationDetails,
} from "../../../redux/slices/application";
import { UpdateCapacity } from "../../../redux/slices/cell";

const Pending = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
            onClick={() => showDeleteDialog(record)}
          />
        </div>
      ),
    },
  ];

  const handleViewApplication = (record) => {
    setLoading(true);
    console.log("pending view application", record);

    dispatch(FetchApplicationDetails(record.id));
    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", { state: { record } });
    }, 700);
  };

  const handleEditApplication = (record) => {
    setLoading(true);
    let thisApplicationDetails = {
      number_of_participants: record.number_of_participants,
      type_of_training: record.type_of_training,
    };
    if (record.number_of_groups !== null) {
      thisApplicationDetails = {
        ...thisApplicationDetails,
        number_of_groups: record.number_of_groups,
      };
    }

    if (record.number_of_participants === constants.GROUP) {
      if (
        record.type_of_training === constants.LOCAL ||
        record.type_of_training === constants.OVER_SEAS ||
        record.type_of_training === constants.DISTANCE
      ) {
        dispatch(
          UpdateCapacity({
            minCapacity: constants.LOCAL_OVERSEAS_DISTANCE.minCapacity,
            maxCapacity: constants.LOCAL_OVERSEAS_DISTANCE.maxCapacity,
          })
        );
      } else if (record.type_of_training === constants.STATUTORY) {
        dispatch(
          UpdateCapacity({
            minCapacity: constants.STATUTORY_CAP.minCapacity,
            maxCapacity: constants.STATUTORY_CAP.maxCapacity,
          })
        );
      }
    } else {
      dispatch(
        UpdateCapacity({
          minCapacity: constants.SINGLE_NOMINEE_CAP.minCapacity,
          maxCapacity: constants.SINGLE_NOMINEE_CAP.maxCapacity,
        })
      );
    }

    window.localStorage.setItem(constants.RECORD_TO_EDIT_ID, record.id);
    dispatch(FetchApplicationDetails(record.id));

    setTimeout(() => {
      setLoading(false);
      navigate("/app/new-application", {
        state: {
          record,
          type: constants.EDIT_APPLICATION,
          details: { ...thisApplicationDetails },
        },
      });
    }, 700);
  };

  const [modal, contextHolder] = Modal.useModal();
  const showDeleteDialog = (record) => {
    modal.confirm({
      title: "Delete Application",
      icon: <DeleteOutlined />,
      content:
        "Do you really want to delete this application? This process can't be undone!",
      okText: "OK",
      cancelText: "CANCEL",
      onOk: () => handleDeleteApplication(record.id),
    });
  };

  const handleDeleteApplication = (application_id) => {
    console.log("delete id ", application_id);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(DeleteApplicationById(application_id));
    }, 700);
  };

  return (
    <DefaultLayout>
      {contextHolder}
      <Spinner loading={loading} />

      <Table
        columns={columns}
        dataSource={addSerialNumber(applications, status.Pending)}
      />
    </DefaultLayout>
  );
};

export default Pending;
