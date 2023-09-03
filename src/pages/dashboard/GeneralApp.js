import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const GeneralApp = () => {
  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Box
        sx={{
          height: '100%',
          width: '100vw',
          backgroundColor: '#F0F4FA',
        }}
      >
        <Stack
          spacing={2}
          sx={{ height: '100%', width: '100%' }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography variant="subtitle2">
            {'This is where it all begins'}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default GeneralApp;
