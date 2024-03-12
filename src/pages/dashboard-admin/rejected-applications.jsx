import { useState } from "react";
import { Table } from "antd";

import DefaultLayout from "../../components/default-layout/default-layout.component";
import MineAllBtns from "../../components/mine-all-btns/mine-all-btns.component";
import { convertDigitInString } from "../../utils/convertDigitsInString";
import { getTime } from "../../utils/getTimeFromTimestamp";

const RejectedApplication = () => {
  const [selected, setSelected] = useState("btn1");

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
    setSelected("btn1");
  };

  const handleShowAll = () => {
    setSelected("btn2");
  };

  return (
    <DefaultLayout>
      <MineAllBtns
        btn1Text={"Mine"}
        btn2Text={"All"}
        selected={selected}
        onClickBtn1={handleShowMine}
        onClickBtn2={handleShowAll}
      />

      <Table className="mt-3" columns={columns} dataSource={[]} />
    </DefaultLayout>
  );
};

export default RejectedApplication;
