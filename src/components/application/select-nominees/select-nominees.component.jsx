import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import FaceIcon from '@mui/icons-material/Face';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './select-nominees.style.css';
import FilterNominees from '../../filter-component';
import { useDispatch, useSelector } from 'react-redux';
import { FetchAllRegisteredUsers } from '../../../redux/slices/nominee';
import NomineeCard from '../../nominee-card';
import CellList from './cell-list/cell-list.component';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const GroupsCell = ({ handleClick }) => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
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
                onDelete={
                  data.label === 'React' ? undefined : handleDelete(data)
                }
              />
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
};

const SelectNominees = ({ user, updateUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nominees } = useSelector((state) => state.nominee);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(FetchAllRegisteredUsers());
  }, []);

  const handleAddNew = () => {
    navigate('/app/register-nominee');
  };

  const handleEdit = () => {
    navigate('/app/register-nominee', {
      state: { nominee_id: 1 },
    });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="row select-container">
      <Form className=" col-md-3" onSubmit={handleSubmit(onSubmit)}>
        {/* <GroupsCell />
        <GroupsCell /> */}
        <CellList />
      </Form>
      <div className="col-md-9 nominees">
        <FilterNominees />
        <div className="row">
          {nominees.length > 0 ? (
            nominees.map((n) => (
              <div key={n.id} className="col-md-4">
                <NomineeCard onEdit={handleEdit} nominee={n} />
              </div>
            ))
          ) : (
            <div className="col-md-12">
              <p className="text-center">
                No Registered nominess.{' '}
                <span
                  className="text-primary cursor-pointer"
                  onClick={handleAddNew}
                >
                  Register Now
                </span>
                .
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={'col-md-12 text-right pb-2 px-20'}>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectNominees;
