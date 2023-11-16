import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import FaceIcon from '@mui/icons-material/Face';
import { useSelector, useDispatch } from 'react-redux';

import { AddNominee } from '../../../../redux/slices/cell';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CellItem = ({ group_id, label }) => {
  const dispatch = useDispatch();

  console.log('l', label);
  console.log('gid', group_id);
  let chipData = useSelector((state) => state.cell.nominees);
  chipData = chipData.filter((chip) => chip.g_id === group_id);
  console.log('chipdata', chipData);

  const handleDelete = (chipToDelete) => () => {
    dispatch(
      AddNominee(
        chipData.filter(
          (chip) => chip.key !== chipToDelete.key && chip.g_id === group_id
        )
      )
    );
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
