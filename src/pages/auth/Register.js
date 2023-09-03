import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';
import RegisterForm from '../../sections/auth/RegisterForm';

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Register</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link component={RouterLink} to="/auth/login" variant="body1">
            Log In
          </Link>
        </Stack>
        {/* Register form */}
        <RegisterForm />
        <Typography
          component={'div'}
          sx={{
            color: 'text.secondary',
            mt: 3,
            typography: 'caption',
            textAlign: 'center',
          }}
        >
          {'By signing I agree to '}
          <Link underline="always" color="text.primary">
            Terms of Service
          </Link>
          {' and '}
          <Link underline="always" color="text.primary">
            Privacy Policy.
          </Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Register;
