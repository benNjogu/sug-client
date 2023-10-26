import _ from 'lodash';

const TableBody = ({ data, columns, onClick }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <tbody className={'td'}>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td
              style={{
                maxWidth: '160px',
                overflow: 'hidden',
                wordWrap: 'break',
                cursor: 'pointer',
              }}
              data-toggle="tooltip"
              title={item[column.path]}
              key={createKey(item, column)}
              onClick={onClick}
            >
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
