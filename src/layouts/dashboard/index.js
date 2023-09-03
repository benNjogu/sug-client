import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

const DashboardLayout = () => {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const isLoggedIn = true;

  const user_id = window.localStorage.getItem('user_id');

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
        }
      };

      window.onload();
    }
  }, [isLoggedIn]);

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
