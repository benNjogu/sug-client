import { Link as RouterLink } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';
import { CaretLeft } from 'phosphor-react';
import NewPasswordForm from '../../sections/auth/new-password-form';

const NewPassword = () => (
  <>
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h3" paragraph>
        Reset Password
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter your new password.
      </Typography>
    </Stack>
    {/* New password form */}
    <NewPasswordForm />
    <Link
      component={RouterLink}
      to="/auth/login"
      color="inherit"
      variant="subtitle2"
      sx={{
        mt: 3,
        mx: 'auto',
        alignItems: 'center',
        display: 'inline-flex',
      }}
    >
      <CaretLeft />
      Return to login
    </Link>
  </>
);

export default NewPassword;
