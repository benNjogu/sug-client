// import { getColumns } from '../../utils/getColumns';

const TableHeader = ({ columns, selectedCategory }) => {
  return (
    <thead style={{ position: 'sticky', top: -1, background: '#F1F5F1' }}>
      <tr>
        {columns.map((column) => (
          <th scope="col" key={column.path || column.key}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
