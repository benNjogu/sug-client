import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';

import { DeletedNominee } from '../../../../redux/slices/cell';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CellItem = ({ group_id, label }) => {
  const dispatch = useDispatch();

  let chipData = useSelector((state) => state.cell.nominees);
  chipData = chipData.filter((chip) => chip.g_id === group_id);
  let { capacity } = useSelector((state) => state.cell.capacity);

  const handleDelete = (chipToDelete) => () => {
    dispatch(DeletedNominee(chipToDelete.key));
  };

  return (
    <div className="group-div">
      <p className="div-counter">
        {label}:{' '}
        <span
          className={
            chipData.length < capacity.minCapacity ? 'text-danger' : ''
          }
        >
          {chipData.length}
        </span>
        /{capacity.maxCapacity}
      </p>
      <Paper
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip label={data.label} onDelete={handleDelete(data)} />
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
};

export default CellItem;
