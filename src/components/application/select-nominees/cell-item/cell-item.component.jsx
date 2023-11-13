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

const CellItem = () => {
  const dispatch = useDispatch();

  let chipData = useSelector((state) => state.cell.nominees);

  const handleDelete = (chipToDelete) => () => {
    dispatch(
      AddNominee(chipData.filter((chip) => chip.key !== chipToDelete.key))
    );
  };

  return (
    <div className="group-div">
      <p className="div-counter">Group 1: 0/25</p>
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
          let icon;

          if (data.label === 'React') {
            icon = <TagFacesIcon />;
          } else if (data.label === 'Angular') {
            icon = <FaceIcon />;
          }

          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
};

export default CellItem;
