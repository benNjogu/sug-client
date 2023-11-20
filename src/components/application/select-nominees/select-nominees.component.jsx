import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FetchAllRegisteredUsers } from '../../../redux/slices/nominee';
import FilterNominees from '../../filter-component';
import NomineeCard from '../../nominee-card/nominee-card.component';
import CellList from './cell-list/cell-list.component';
import './select-nominees.style.css';
import { AddNewGroup, AddNominee } from '../../../redux/slices/cell';

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
    navigate('/app/register-nominee', { state: { prevPage: 'select' } });
  };

  const handleEdit = () => {
    navigate('/app/register-nominee', {
      state: { nominee_id: 1 },
    });
  };

  let group_nominees = useSelector((state) => state.cell.nominees);
  console.log('ns', group_nominees);
  const handleAddNominee = (g_id, n_id, n_first_name) => {
    group_nominees = [
      ...group_nominees,
      { key: n_id, label: n_first_name, g_id },
    ];

    dispatch(AddNominee(group_nominees));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="row select-container">
      <Form className=" col-md-3" onSubmit={handleSubmit(onSubmit)}>
        <CellList />
      </Form>
      <div className="col-md-9 nominees">
        <FilterNominees onAddNew={handleAddNew} />
        <div className="row">
          {nominees.length > 0 ? (
            nominees.map((n) => (
              <div key={n.id} className="col-md-4">
                <NomineeCard
                  onEdit={handleEdit}
                  nominee={n}
                  component="select_nominee"
                  onAdd={handleAddNominee}
                />
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
