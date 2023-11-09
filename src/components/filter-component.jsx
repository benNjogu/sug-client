import { Plus } from 'phosphor-react';

import { constants } from '../data/constants';

const FilterNominees = ({ onAddNew }) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <button
          type="button"
          className="btn btn-md btn-outline-primary mb-1"
          data-toggle="modal"
          data-target="#selectItemModal"
          onClick={onAddNew}
        >
          <Plus size={20} /> {constants.ADD_NEW}
        </button>
      </div>
      <div className="col-md-6">
        <form className="mb-1">
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
  );
};

export default FilterNominees;
