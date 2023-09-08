import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  //const isAuthenticated = false;

  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }

  return (
    <>
      <Container sx={{ mt: 5, overflowY: 'auto' }} maxWidth="sm">
        <Stack
          spacing={5}
          sx={{ width: '100%' }}
          direction="column"
          alignItems="center"
        >
          <img src={Logo} alt="Logo" style={{ height: 120, width: 240 }} />
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
