import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";

import DefaultLayout from "../../../components/default-layout/default-layout.component";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import Spinner from "../../../components/spinner";
import { GetDefferredAndRejects } from "../../../redux/slices/organization";
import { constants } from "../../../data/constants";
import { FetchApplicationDetails } from "../../../redux/slices/application";
import { UpdateCapacity } from "../../../redux/slices/cell";

const DefferedApplications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { applications } = useSelector((state) => state.application);
  const { defferred_and_rejects } = useSelector((state) => state.organization);

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
          <EditOutlined
            className="mx-2"
            onClick={() => handleEditApplication(record)}
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

    dispatch(FetchApplicationDetails(record.application_id));
    setTimeout(() => {
      setLoading(false);
      navigate("/app/view-application", {
        state: { record: { ...application[0], approved: constants.DEFFERED } },
      });
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

    window.localStorage.setItem(
      constants.RECORD_TO_EDIT_ID,
      record.application_id
    );
    dispatch(FetchApplicationDetails(record.application_id));

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

  useEffect(() => {
    dispatch(GetDefferredAndRejects());
  }, []);

  return (
    <DefaultLayout>
      <Spinner loading={loading} />
      <Table
        columns={columns}
        dataSource={addSerialNumber(defferred_and_rejects, status.Deffered)}
      />
    </DefaultLayout>
  );
};

export default DefferedApplications;
