import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';

import { AddNominee, DeletedNominee } from '../../../../redux/slices/cell';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CellItem = ({ group_id, label }) => {
  const dispatch = useDispatch();

  let original_chipData = useSelector((state) => state.cell.nominees);
  let chipData = original_chipData.filter((chip) => chip.g_id === group_id);
  console.log('c', chipData);

  const handleDelete = (chipToDelete) => () => {
    dispatch(DeletedNominee(chipToDelete.key));
    // dispatch(
    //   AddNominee(
    //     original_chipData.filter((chip) => chip.key !== chipToDelete.key)
    //   )
    // );
  };

  return (
    <div className="group-div">
      <p className="div-counter">{label}: 0/25</p>
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
