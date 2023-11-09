import CustomButton from '../custom-button/custom-button.component';
import './add-cell.styles.css';

const AddCell = ({ prevCellId, forceVisible }) => {
  const handleClick = () => {};

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <CustomButton
          style="is-rounded"
          handleClick={() => handleClick()}
          size="is-small"
          text="Add Group"
        />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
