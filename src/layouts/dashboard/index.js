import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { connectSocket, socket } from "../../socket";
import { Stack } from "@mui/material";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const user_id = window.localStorage.getItem("user_id");
  const { account_type } = useSelector((state) => state.auth.user_data);

  useEffect(() => {
    if (isLoggedIn && account_type !== process.env.REACT_APP_AccountType0) {
      if (!socket) {
        connectSocket(user_id);
      }
    }

    return () => {};
  }, [isLoggedIn, socket]);

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
