import { Plus } from "phosphor-react";

import { constants } from "../../data/constants";
import SearchBox from "../search-box";

import "./filter-styles.css";

const FilterNominees = ({
  onAddNew,
  options,
  placeholder,
  searchQuery,
  onSearch,
  onSort,
}) => {
  return (
    <div className="row d-flex justify-content-between">
      <div className="col-md-2">
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
      <div className="col-md-7 search-box">
        <SearchBox
          placeholder={placeholder}
          value={searchQuery}
          onChange={onSearch}
        />
      </div>
      <div className="col-md-3">
        <select class="form-control form-control-md" onChange={onSort}>
          {options.map((o) => (
            <option>{o}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterNominees;
