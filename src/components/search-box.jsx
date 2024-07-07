const SearchBox = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control text-primary"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
