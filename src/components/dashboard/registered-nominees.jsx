import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';

import { constants } from '../../data/constants';
import NomineeCard from '../nominee-card';
import { FetchAllRegisteredUsers } from '../../redux/slices/nominee';

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
    <>
      <div className="row">
        <div className="col-md-3">
          <button
            type="button"
            className="btn btn-md btn-outline-primary"
            style={{ marginBottom: 8 }}
            data-toggle="modal"
            data-target="#selectItemModal"
            onClick={handleAddNew}
          >
            <Plus size={20} /> {constants.ADD_NEW}
          </button>
        </div>
        <div className="col-md-6">
          <form className="mb-5">
            <div className="input-group input-group-md">
              <input
                type="search"
                name="search"
                className="form-control"
                id="search"
                placeholder="Name..."
                aria-label="Search for..."
              />
              <span className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </span>
            </div>
          </form>
        </div>
        <div className="col-md-3">
          <select class="form-control form-control-md">
            <option>All</option>
            <option>Top management</option>
            <option>Middle level management</option>
            <option>Supervisory</option>
            <option>Operative</option>
            <option>Others</option>
          </select>
        </div>
      </div>
      <div className="row overflow-auto" style={{ height: 436 + 'px' }}>
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
  );
};

export default Registered;
