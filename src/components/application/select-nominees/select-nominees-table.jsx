import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";

import { addSerialNumber, status } from "../../../utils/addSerialNumber";
import { constants } from "./../../../data/constants";

const SelectNomineesTable = ({
  nominees,
  handleEdit,
  group_id,
  label,
  details,
  onAdd,
  onRemove,
}) => {
  const combinedNominees = useSelector((state) => state.cell.combinedNominees);
  let { number_of_participants } = details;

  const getUserKeys = () => {
    let a = [];

    for (let i = 0; i < combinedNominees?.length; i++) {
      a.push(combinedNominees[i].nominee_id);
    }

    return a;
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Name",
      dataIndex: "first_name" + " " + "last_name",
      render(text, record) {
        return {
          children: <div>{`${record.first_name}  ${record.last_name}`}</div>,
        };
      },
    },
    ,
    {
      title: "Gender",
      dataIndex: "sex",
      render(text, record) {
        return {
          children: <div>{text === "F" ? "Female" : "Male"}</div>,
        };
      },
    },
    {
      title: "Level",
      dataIndex: "job_level",
    },
    {
      title: "Edit",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <button
            class="btn btn-sm btn-outline-warning"
            onClick={() => handleEdit(record)}
          >
            Edit
          </button>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex justify-content-around">
          <button
            className={`btn btn-sm btn-outline-${
              getUserKeys().includes(record.id) ? "danger" : "success"
            }`}
            onClick={() => handleAddOrRemove(record)}
          >
            {getUserKeys().includes(record.id)
              ? number_of_participants === constants.ONE
                ? "REMOVE NOMINEE"
                : `REMOVE GROUP ${getNomineeId(record.id)}`
              : label.toUpperCase()}
          </button>
        </div>
      ),
    },
  ];

  const getNomineeId = (id) => {
    for (let i = 0; i < combinedNominees?.length; i++) {
      if (combinedNominees[i].nominee_id === id) {
        return combinedNominees[i].group_id;
      }
    }
  };

  const handleAddOrRemove = (record) => {
    getUserKeys().includes(record.id)
      ? onRemove(record.id, getNomineeId(record.id))
      : onAdd(group_id, record.id, record.first_name);
  };

  useEffect(() => {
    getUserKeys();
  }, []);

  return (
    <Table
      className="mt-3"
      columns={columns}
      dataSource={addSerialNumber(nominees, status.All)}
    />
  );
};

export default SelectNomineesTable;
