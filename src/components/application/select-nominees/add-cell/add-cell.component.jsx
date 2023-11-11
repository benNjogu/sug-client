import { useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { AddNewCell } from '../../../../redux/slices/cell';
import './add-cell.styles.css';

const AddCell = ({ handleClick }) => {
  const dispatch = useDispatch();
  // const handleClick = () => {
  //   dispatch(AddNewCell());
  // };

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
