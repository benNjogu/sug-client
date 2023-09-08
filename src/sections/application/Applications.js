import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'course', headerName: 'COURSE', width: 200 },
  { field: 'provider', headerName: 'PROVIDER', width: 130 },
  { field: 'status', headerName: 'STATUS', width: 130 },
];

const rows = [
  {
    id: 1,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
  {
    id: 2,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Rejected',
  },
  {
    id: 3,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
  {
    id: 4,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Pending',
  },
  {
    id: 5,
    course: 'Information technology',
    provider: 'Jommo Kenyatta University of Technology',
    status: 'Approved',
  },
];

const Applications = () => {
  return (
    <div>
      <Button variant="contained">New Application</Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Applications;
