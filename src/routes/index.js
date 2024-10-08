import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

// layouts
import AuthLayout from "../layouts/auth/index";
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/loading-screen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const { user_data } = useSelector((state) => state.auth);
  let { account_type } = user_data;
  console.log("account type", account_type);

  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "new-password", element: <NewPassword /> },
        { path: "verify-otp", element: <Verify /> },
      ],
    },
    // organization routes
    account_type === process.env.REACT_APP_AccountType0
      ? {
          path: "/",
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
            { path: "app", element: <Applications /> },
            { path: "approved", element: <Approved /> },
            { path: "pending", element: <Pending /> },
            { path: "deffered", element: <Deffered /> },
            { path: "rejected", element: <Rejected /> },
            { path: "registered", element: <Registered /> },
            { path: "profile", element: <Profile /> },

            { path: "404", element: <Page404 /> },
            { path: "*", element: <Navigate to="/404" replace /> },
          ],
        }
      : // admin routes
      account_type === process.env.REACT_APP_AccountType1 ||
        account_type === process.env.REACT_APP_AccountType2 ||
        account_type === process.env.REACT_APP_AccountType3
      ? {
          path: "/",
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
            { path: "app", element: <PendingApplications /> },
            { path: "admin-approved", element: <ApprovedApplications /> },
            { path: "admin-all-applications", element: <AllApplications /> },
            { path: "admin-deffered", element: <DefferedApplications /> },
            { path: "admin-rejected", element: <RejectedApplications /> },
            { path: "admin-all-admins", element: <CreateAdimin /> },
            { path: "admin-all-nominees", element: <AllNominees /> },
            { path: "admin-organizations", element: <AllOrganizations /> },
            { path: "admin-profile", element: <AdminProfile /> },
            { path: "admin-view-report", element: <ViewReport /> },
            { path: "admin-reports", element: <AdminReports /> },

            { path: "404", element: <Page404 /> },
            { path: "*", element: <Navigate to="/404" replace /> },
          ],
        }
      : account_type === process.env.REACT_APP_AccountType4 ||
        account_type === process.env.REACT_APP_AccountType5
      ? {
          path: "/",
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
            { path: "app", element: <CreateAdimin /> },
            { path: "admin-all-applications", element: <AllApplications /> },
            { path: "admin-pending", element: <PendingApplications /> },
            { path: "admin-approved", element: <ApprovedApplications /> },
            { path: "admin-deffered", element: <DefferedApplications /> },
            { path: "admin-rejected", element: <RejectedApplications /> },
            { path: "admin-organizations", element: <AllOrganizations /> },
            { path: "admin-reports", element: <AdminReports /> },
            { path: "admin-view-report", element: <ViewReport /> },
            { path: "admin-profile", element: <AdminProfile /> },

            { path: "404", element: <Page404 /> },
            { path: "*", element: <Navigate to="/404" replace /> },
          ],
        }
      : "",

    { path: "app/register-nominee", element: <RegisterNominee /> },
    { path: "app/new-application/*", element: <NewApplication /> },
    { path: "app/view-application", element: <ViewApplication /> },
    { path: "app/view-organization", element: <ViewOrganization /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Applications = Loadable(
  lazy(() =>
    import("../pages/dashboard-organization/home/applications.component")
  )
);
const Approved = Loadable(
  lazy(() => import("../pages/dashboard-organization/approved/approved"))
);
const Pending = Loadable(
  lazy(() => import("../pages/dashboard-organization/pending/pending"))
);
const Deffered = Loadable(
  lazy(() => import("../pages/dashboard-organization/deffered/deffered"))
);
const Rejected = Loadable(
  lazy(() => import("../pages/dashboard-organization/rejected/rejected"))
);
const Registered = Loadable(
  lazy(() =>
    import("../pages/dashboard-organization/registered/registered-nominees")
  )
);

const Profile = Loadable(
  lazy(() => import("../pages/dashboard-organization/profile/profile"))
);

const RegisterNominee = Loadable(
  lazy(() =>
    import(
      "../pages/dashboard-organization/register-nominees/register-nominee.component"
    )
  )
);
const NewApplication = Loadable(
  lazy(() =>
    import(
      "../pages/dashboard-organization/new-application/new-application.component"
    )
  )
);
const ViewApplication = Loadable(
  lazy(() => import("../pages/application-details/view-application-details"))
);

// Admin pages
const CreateAdimin = Loadable(
  lazy(() => import("../pages/dashboard-admin/create-admin"))
);
const AllApplications = Loadable(
  lazy(() => import("../pages/dashboard-admin/all-applications"))
);
const ApprovedApplications = Loadable(
  lazy(() => import("../pages/dashboard-admin/approved-applications"))
);
const PendingApplications = Loadable(
  lazy(() => import("../pages/dashboard-admin/pending-applications"))
);
const DefferedApplications = Loadable(
  lazy(() => import("../pages/dashboard-admin/deffered-applications"))
);
const RejectedApplications = Loadable(
  lazy(() => import("../pages/dashboard-admin/rejected-applications"))
);
const AllNominees = Loadable(
  lazy(() => import("../pages/dashboard-admin/all-nominees"))
);
const AllOrganizations = Loadable(
  lazy(() => import("../pages/dashboard-admin/all-organizations"))
);
const AdminProfile = Loadable(
  lazy(() => import("../pages/dashboard-admin/admin-profile"))
);
const ViewOrganization = Loadable(
  lazy(() =>
    import(
      "../pages/dashboard-admin/organization-details/view-organization-details.component"
    )
  )
);
const AdminReports = Loadable(
  lazy(() => import("../pages/dashboard-admin/reports"))
);
const ViewReport = Loadable(
  lazy(() => import("../pages/dashboard-admin/report/report.component"))
);

const Login = Loadable(lazy(() => import("../pages/auth/login")));
const Register = Loadable(lazy(() => import("../pages/auth/register")));
const Verify = Loadable(lazy(() => import("../pages/auth/verify")));
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/reset-password"))
);
const NewPassword = Loadable(lazy(() => import("../pages/auth/new-password")));

const Page404 = Loadable(
  lazy(() => import("../pages/error_page/page-404.component"))
);
