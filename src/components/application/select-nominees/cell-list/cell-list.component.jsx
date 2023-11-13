import { Fragment, useState } from 'react';

import AddCell from '../add-cell/add-cell.component';
import CellItem from '../cell-item/cell-item.component';

const CellList = () => {
  const [cells, setCells] = useState([{ id: 1 }]);

  const handleClick = () => {
    console.log(cells.length);
    setCells([...cells, { id: cells.length + 1 }]);
  };

  console.log(cells);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellItem />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell
        forceVisible={cells?.length === 0}
        prevCellId={cells?.length - 1}
        handleClick={handleClick}
      />
    </div>
  );
};

export default CellList;
