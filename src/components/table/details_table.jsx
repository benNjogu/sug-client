import Table from './table';

const DetailsTable = ({ columns, names, selectedCategory, onClick }) => {
  return (
    <div>
      <Table
        columns={columns}
        data={names}
        selectedCategory={selectedCategory}
        onClick={onClick}
      />
    </div>
  );
};

export default DetailsTable;
