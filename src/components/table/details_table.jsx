import Table from './table';

const DetailsTable = ({ columns, names, selectedCategory }) => {
  return (
    <div>
      <Table
        columns={columns}
        data={names}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default DetailsTable;
