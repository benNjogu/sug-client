import CustomButton from '../custom-button/custom-button.component';
import './add-cell.styles.css';

const AddCell = ({ handleClick }) => {
  return (
    <div className={`add-cell`}>
      <div className="add-buttons">
        <CustomButton handleClick={handleClick} text="Add Group" />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
