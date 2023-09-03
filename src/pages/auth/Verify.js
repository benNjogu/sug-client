import { useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';

import VerifyForm from '../../sections/auth/VerifyForm';
import auth from '../../redux/slices/auth';

const Verify = () => {
  // const { email } = useSelector((state) => state.auth);
  const { email } = 'a@b.com';

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{'Please verify OTP'}</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{`Sent to email (${email})`}</Typography>
        </Stack>
      </Stack>
      {/* Verify form */}
      <VerifyForm />
    </>
  );
};

export default Verify;
