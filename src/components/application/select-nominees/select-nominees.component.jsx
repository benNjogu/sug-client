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
import { AddNominee } from '../../../redux/slices/cell';

const SelectNominees = ({ user, updateUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nominees } = useSelector((state) => state.nominee);
  const { capacity } = useSelector((state) => state.cell.capacity);

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
  const handleAddNominee = (g_id, n_id, n_first_name) => {
    if (capacity.maxCapacity > 1) {
      group_nominees = [
        { key: n_id, label: n_first_name, g_id },
        ...group_nominees,
      ];
    } else {
      group_nominees = [{ key: n_id, label: n_first_name, g_id }];
    }

    dispatch(AddNominee(group_nominees));
  };

  const checkGroupIsAboveMinimumCapacity = () => {
    const resultArray = Object.values(
      group_nominees.reduce((acc, group) => {
        const g_id = group.g_id;
        (acc[g_id] = acc[g_id] || []).push(group);
        return acc;
      }, {})
    );

    let sizes = [];
    for (let i = 0; i < resultArray.length; i++) {
      sizes.push(resultArray[i].length);
    }

    return sizes.every((g) => g >= capacity.minCapacity);
  };

  const handleSubmit = () => {
    if (checkGroupIsAboveMinimumCapacity()) {
      updateUser({
        nominees: group_nominees,
      });
      navigate('/app/new-application/course');
    } else return;
  };

  return (
    <div className="row select-container">
      <Form className=" col-md-3">
        <CellList user={user} />
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
        <Button variant="primary" type="button" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectNominees;
