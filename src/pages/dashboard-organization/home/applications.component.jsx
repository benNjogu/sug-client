import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Modal, Table } from "antd";
import { constants } from "../../../data/constants";
import DefaultLayout from "../../../components/default-layout/default-layout.component";
import {
  FetchApplicationDetails,
  FetchOrganizationApplications,
} from "../../../redux/slices/application";
import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import Spinner from "../../../components/spinner";

import "./applications.styles.css";
import NewApplicationModalComponent from "../../../components/modal/new-application-modal-component.component";
import SearchBox from "../../../components/search-box";
import { UpdateCapacity } from "../../../redux/slices/cell";

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchCourse, setSearchCourse] = useState("");
  const [searchYear, setSearchYear] = useState("");
  let { applications } = useSelector((state) => state.application);

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
      render: (id, record) =>
        record.approved === "Rejected" ? (
          <div className="d-flex justify-content-around">
            <div className="mx-2" />
            <div className="mx-2" />
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
            <EditOutlined
              className="mx-2"
              onClick={() => handleEditApplication(record)}
            />
            <DeleteOutlined
              className="mx-2"
              onClick={() => handleDeleteApplication(record)}
            />
          </div>
        ) : record.approved === "Deffered" ? (
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
        ) : (
          <div className="d-flex justify-content-around">
            <div className="mx-2" />
            <div className="mx-2" />
            <EyeOutlined
              className="mx-2"
              onClick={() => handleViewApplication(record)}
            />
          </div>
        ),
    },
  ];

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

  const handleSearchCourse = (query) => {
    setSearchCourse(query);
  };

  const handleSearchYear = (query) => {
    setSearchYear(query);
  };

  const handleNextClick = (details) => {
    setShowModal(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/app/new-application", {
        state: { details, type: constants.NEW_APPLICATION },
      });
    }, 800);
  };

  const handleViewApplication = (record) => {
    setLoading(true);
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

  const handleDeleteApplication = (record) => {
    console.log("delete application", record);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(FetchOrganizationApplications());
  }, []);

  return (
    <DefaultLayout>
      <Spinner loading={loading} />

      <div>
        <div className="row d-flex justify-content-between">
          <div className="col-md-4">
            <button
              className="btn btn-primary"
              style={{ marginBottom: 12 }}
              onClick={handleShowModal}
            >
              {constants.NEW_APPLICATION}
            </button>
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

        {showModal && (
          <Modal
            open={showModal}
            title={`Select appropriately`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <NewApplicationModalComponent
                handleClose={handleCancel}
                onClick={handleNextClick}
              />
            }
          </Modal>
        )}
        <Table
          columns={columns}
          dataSource={addSerialNumber(applications, status.All)}
        />
      </div>
    </DefaultLayout>
  );
};

export default Applications;
