import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import LoginForm from "../../sections/auth/login-form";

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Login</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">No Account?</Typography>
          <Link to="/auth/register" variant="body2" component={RouterLink}>
            Register
          </Link>
        </Stack>
        {/* Login form */}
        <LoginForm />
      </Stack>
    </>
  );
};

export default Login;
