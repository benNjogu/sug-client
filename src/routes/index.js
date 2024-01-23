import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import AuthLayout from '../layouts/auth/index';
import DashboardLayout from '../layouts/dashboard';

// config
import { DEFAULT_PATH } from '../config';
import LoadingScreen from '../components/loading-screen';

import Applications from './../pages/dashboard/home/applications';
import Approved from '../pages/dashboard/approved/approved';
import Pending from '../pages/dashboard/pending/pending';
import Rejected from '../pages/dashboard/rejected/rejected';
import Registered from '../pages/dashboard/registered/registered-nominees';
import Nominees from '../pages/dashboard/all-nominees/nominees';
import Profile from '../pages/dashboard/profile/profile';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
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
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: 'app', element: <Applications /> },
        { path: 'profile', element: <Profile /> },
        { path: 'approved', element: <Approved /> },
        { path: 'pending', element: <Pending /> },
        { path: 'rejected', element: <Rejected /> },
        { path: 'registered', element: <Registered /> },
        { path: 'nominees', element: <Nominees /> },

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

const RegisterNominee = Loadable(
  lazy(() => import('../pages/register-nominees/register-nominee'))
);
const NewApplication = Loadable(
  lazy(() => import('../pages/application/new-application'))
);
const ViewApplication = Loadable(
  lazy(() => import('../pages/application-details/view-application-details'))
);

const Login = Loadable(lazy(() => import('../pages/auth/login')));
const Register = Loadable(lazy(() => import('../pages/auth/register')));
const Verify = Loadable(lazy(() => import('../pages/auth/verify')));
const ResetPassword = Loadable(
  lazy(() => import('../pages/auth/reset-password'))
);
const NewPassword = Loadable(lazy(() => import('../pages/auth/new-password')));

const Page404 = Loadable(lazy(() => import('../pages/page-404')));
