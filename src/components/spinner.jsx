// spans in a line
export const FetchingData = () => {
  return (
    <div class="col-md-6">
      <p className="font-italic text-success m-3">Fetching data...</p>
    </div>
  );
};

// spans whole page
const Spinner = ({ loading }) => {
  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner-border" role="status" />
      </div>
    );
  } else return "";
};

export default Spinner;
