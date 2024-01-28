import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// layouts
import AuthLayout from '../layouts/auth/index';
import DashboardLayout from '../layouts/dashboard';

// config
import { DEFAULT_PATH } from '../config';
import LoadingScreen from '../components/loading-screen';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  let { account_type } = useSelector((state) => state.auth).account_type;

  return useRoutes([
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify-otp', element: <Verify /> },
      ],
    },
    account_type === process.env.REACT_APP_AccountType0
      ? {
          path: '/',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
            { path: 'app', element: <Applications /> },
            { path: 'approved', element: <Approved /> },
            { path: 'pending', element: <Pending /> },
            { path: 'rejected', element: <Rejected /> },
            { path: 'registered', element: <Registered /> },
            { path: 'profile', element: <Profile /> },

            { path: '404', element: <Page404 /> },
            { path: '*', element: <Navigate to="/404" replace /> },
          ],
        }
      : {
          path: '/',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
            { path: 'app', element: <AllApplications /> },
            { path: 'admin-approved', element: <ApprovedApplications /> },
            { path: 'admin-pending', element: <PendingApplications /> },
            { path: 'admin-rejected', element: <RejectedApplications /> },
            { path: 'admin-all-admins', element: <CreateAdimin /> },
            { path: 'admin-organizations', element: <AllOrganizations /> },
            { path: 'admin-profile', element: <AdminProfile /> },

            { path: '404', element: <Page404 /> },
            { path: '*', element: <Navigate to="/404" replace /> },
          ],
        },

    { path: 'app/register-nominee', element: <RegisterNominee /> },
    { path: 'app/new-application/*', element: <NewApplication /> },
    { path: 'app/view-application', element: <ViewApplication /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const Applications = Loadable(
  lazy(() => import('./../pages/dashboard/home/applications'))
);
const Approved = Loadable(
  lazy(() => import('../pages/dashboard/approved/approved'))
);
const Pending = Loadable(
  lazy(() => import('../pages/dashboard/pending/pending'))
);
const Rejected = Loadable(
  lazy(() => import('../pages/dashboard/rejected/rejected'))
);
const Registered = Loadable(
  lazy(() => import('../pages/dashboard/registered/registered-nominees'))
);

const Profile = Loadable(
  lazy(() => import('../pages/dashboard/profile/profile'))
);

const RegisterNominee = Loadable(
  lazy(() => import('../pages/register-nominees/register-nominee.component'))
);
const NewApplication = Loadable(
  lazy(() => import('../pages/application/new-application.component'))
);
const ViewApplication = Loadable(
  lazy(() => import('../pages/application-details/view-application-details'))
);

// Admin pages
const CreateAdimin = Loadable(
  lazy(() => import('../pages/dashboard-admin/create-admin'))
);
const AllApplications = Loadable(
  lazy(() => import('../pages/dashboard-admin/all-applications'))
);
const ApprovedApplications = Loadable(
  lazy(() => import('../pages/dashboard-admin/approved-applications'))
);
const PendingApplications = Loadable(
  lazy(() => import('../pages/dashboard-admin/pending-applications'))
);
const RejectedApplications = Loadable(
  lazy(() => import('../pages/dashboard-admin/rejected-applications'))
);
const AllOrganizations = Loadable(
  lazy(() => import('../pages/dashboard-admin/all-organizations'))
);
const AdminProfile = Loadable(
  lazy(() => import('../pages/dashboard-admin/admin-profile'))
);

const Login = Loadable(lazy(() => import('../pages/auth/login')));
const Register = Loadable(lazy(() => import('../pages/auth/register')));
const Verify = Loadable(lazy(() => import('../pages/auth/verify')));
const ResetPassword = Loadable(
  lazy(() => import('../pages/auth/reset-password'))
);
const NewPassword = Loadable(lazy(() => import('../pages/auth/new-password')));

const Page404 = Loadable(lazy(() => import('../pages/page-404')));
