import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

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
        { path: 'app', element: <GeneralApp /> },
        { path: 'app/application', element: <Application /> },
        { path: 'app/view-application', element: <ViewApplication /> },

        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import('../pages/dashboard/general-app.component'))
);

const Application = Loadable(
  lazy(() => import('../pages/application/application'))
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
