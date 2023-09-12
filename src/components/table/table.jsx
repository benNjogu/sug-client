import TableHeader from './table_header';
import TableBody from './table_body';

const Table = ({ columns, data, selectedCategory }) => {
  return (
    <table className="table table-fit">
      <TableHeader columns={columns} selectedCategory={selectedCategory} />
      <TableBody
        columns={columns}
        data={data}
        selectedCategory={selectedCategory}
      />
    </table>
  );
};

export default Table;
