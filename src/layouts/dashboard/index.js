import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
