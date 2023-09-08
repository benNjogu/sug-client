import { constants } from '../data/constants';

const Category = ({ categories, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group cursor-pointer">
      {categories.map((item) => (
        <li
          onClick={() => onItemSelect(item.category_id)}
          key={item.category_id}
          className={
            item.category_id === selectedItem
              ? 'list-group-item active d-flex justify-content-between align-items-center'
              : 'list-group-item d-flex justify-content-between align-items-center'
          }
          style={{ cursor: 'pointer' }}
        >
          {item.description}
          {item.description !== constants.LOGOUT && (
            <span class="badge badge-primary badge-pill">14</span>
          )}
        </li>
      ))}
    </ul>
  );
};

Category.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default Category;
