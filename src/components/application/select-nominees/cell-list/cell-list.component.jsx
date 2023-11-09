import { Fragment } from 'react';
import AddCell from '../add-cell/add-cell.component';
import CellItem from '../cell-item/cell-item.component';

const CellList = () => {
  //   const cells = useTypedSelector(({ cell: { order, data } }) =>
  //     order.map((id) => data[id])
  //   );
  const cells = [{ id: 1 }];

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellItem />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
    </div>
  );
};

export default CellList;
