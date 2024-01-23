import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from '../../components/default-layout/default-layout.component';

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn, 'in');

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default DashboardLayout;
