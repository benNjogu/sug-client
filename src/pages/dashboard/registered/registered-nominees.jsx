import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NomineeCard from '../../../components/nominee-card/nominee-card.component';
import { FetchAllRegisteredUsers } from './../../../redux/slices/nominee';
import FilterNominees from '../../../components/filter-component';
import DefaultLayout from '../../../components/default-layout/default-layout.component';

const Registered = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nominees } = useSelector((state) => state.nominee);

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

  return (
    <DefaultLayout>
      <>
        <FilterNominees onAddNew={handleAddNew} />
        <div className="row overflow-auto">
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
      </>
    </DefaultLayout>
  );
};

export default Registered;
