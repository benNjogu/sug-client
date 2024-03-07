const Spinner = ({ loading }) => {
  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner-border" role="status" />
      </div>
    );
  } else return '';
};

export default Spinner;
