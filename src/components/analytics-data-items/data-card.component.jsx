import "./data-item.styles.css";

const DataCard = ({ value, valueText }) => {
  return (
    <div className="card-container">
      <div className="info">
        <h1 className="amount">{value || 0}</h1>
        <p className="data-type">{valueText}</p>
      </div>
    </div>
  );
};

export default DataCard;
