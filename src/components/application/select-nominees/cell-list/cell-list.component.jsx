import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddCell from "../add-cell/add-cell.component";
import CellItem from "../cell-item/cell-item.component";
import { AddNewGroup } from "../../../../redux/slices/cell";
import { constants } from "../../../../data/constants";

const CellList = ({ user, details }) => {
  const dispatch = useDispatch();

  let chipData = useSelector((state) => state.cell.nominees);
  chipData = chipData.filter((chip) => chip.g_id === 1);
  let { capacity } = useSelector((state) => state.cell.capacity);

  let groups = useSelector((state) => state.cell.groups);
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   let new_group = {
  //     g_id: groups.length + 1,
  //     label: "Group " + (groups.length + 1),
  //   };

  //   dispatch(AddNewGroup([new_group, ...groups]));
  // };

  const createGroups = () => {
    let created_groups = [];
    let new_group = {};
    for (let i = 1; i <= Number(details?.number_of_groups); i++) {
      new_group = {
        g_id: i,
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
    <Fragment key={cell.g_id}>
      <CellItem group_id={cell.g_id} label={cell.label} user={user} />
    </Fragment>
  );
};

export default CellList;
