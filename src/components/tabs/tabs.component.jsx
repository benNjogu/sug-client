import SearchBox from "../search-box";

const CustomTabs = ({
  btn1Text,
  btn2Text,
  selected = "btn1",
  onClickBtn1,
  onClickBtn2,
  search = false,
  placeholder,
  searchValue,
  onChangeValue,
}) => {
  return (
    <div className="d-flex justify-content-between">
      <button
        type="button"
        className={`btn w-25 ${
          selected === "btn1" ? "btn-primary" : "btn-outline-secondary"
        }`}
        onClick={onClickBtn1}
      >
        {btn1Text}
      </button>
      {search && (
        <div className="col-md-4">
          <SearchBox
            placeholder={placeholder}
            value={searchValue}
            onChange={onChangeValue}
          />
        </div>
      )}
      <button
        type="button"
        className={`btn w-25 ${
          selected === "btn2" ? "btn-primary" : "btn-outline-secondary"
        }`}
        onClick={onClickBtn2}
      >
        {btn2Text}
      </button>
    </div>
  );
};

export default CustomTabs;
