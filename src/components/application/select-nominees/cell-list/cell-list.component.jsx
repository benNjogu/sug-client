import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddCell from '../add-cell/add-cell.component';
import CellItem from '../cell-item/cell-item.component';
import { AddNewGroup } from '../../../../redux/slices/cell';

const CellList = () => {
  const dispatch = useDispatch();

  let groups = useSelector((state) => state.cell.groups);
  const handleClick = () => {
    let new_group = {
      g_id: groups.length + 1,
      label: 'Group ' + (groups.length + 1),
    };

    dispatch(AddNewGroup([new_group, ...groups]));
  };

  const renderedCells = groups.map((cell) => (
    <Fragment key={cell.g_id}>
      <CellItem group_id={cell.g_id} label={cell.label} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell
        forceVisible={groups?.length === 0}
        prevCellId={groups?.length - 1}
        handleClick={handleClick}
      />
      {renderedCells}
    </div>
  );
};

export default CellList;
