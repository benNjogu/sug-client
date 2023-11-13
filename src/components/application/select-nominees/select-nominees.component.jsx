import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FetchAllRegisteredUsers } from '../../../redux/slices/nominee';
import FilterNominees from '../../filter-component';
import NomineeCard from '../../nominee-card';
import CellList from './cell-list/cell-list.component';
import './select-nominees.style.css';
import { AddNominee } from '../../../redux/slices/cell';

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

  let group = useSelector((state) => state.cell.nominees);
  const handleAddNominee = (n_id, n_first_name) => {
    group = [...group, { key: n_id, label: n_first_name }];
    dispatch(AddNominee(group));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="row select-container">
      <Form className=" col-md-3" onSubmit={handleSubmit(onSubmit)}>
        <CellList group={''} />
      </Form>
      <div className="col-md-9 nominees">
        <FilterNominees />
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
