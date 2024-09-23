import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CellItem from "../cell-item/cell-item.component";
import { AddNewGroup } from "../../../../redux/slices/cell";

const CellList = ({ user, details }) => {
  const dispatch = useDispatch();

  let chipData = useSelector((state) => state.cell.nominees);
  chipData = chipData.filter((chip) => chip.group_id === 1);

  let groups = useSelector((state) => state.cell.groups);

  const createGroups = () => {
    let created_groups = [];
    let new_group = {};
    for (let i = 1; i <= Number(details?.number_of_groups); i++) {
      new_group = {
        group_id: i,
        label: "Group " + i,
      };
      created_groups.push(new_group);
    }

    return created_groups;
  };

  useEffect(() => {
    dispatch(AddNewGroup([...createGroups(), ...groups]));
  }, []);

  return (
    <Fragment key={cell.group_id}>
      <CellItem group_id={cell.group_id} label={cell.label} user={user} />
    </Fragment>
  );
};

export default CellList;
