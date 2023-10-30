import { Plus } from 'phosphor-react';

import { constants } from '../../data/constants';
import NomineeCard from '../nominee-card';

const Registered = () => {
  // let users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let users = [];

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
      <div className="row" style={{ height: 436 + 'px', overflowY: 'scroll' }}>
        {users.length > 0 ? (
          users.map((u) => (
            <div className="col-md-4">
              <NomineeCard />
            </div>
          ))
        ) : (
          <div className="col-md-12">
            <p className="text-center">
              No Registered nominess.{' '}
              <span className="text-primary cursor-pointer">Register Now</span>.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Registered;
