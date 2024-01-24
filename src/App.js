import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// routes
import Router from './routes/index';
import { CloseSnackbar } from './redux/slices/app';
import { getAccountType } from './redux/slices/auth';

const vertical = 'bottom';
const horizontal = 'center';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.app.snackbar
  );

  const handleClose = () => {
    dispatch(CloseSnackbar());
  };

  return (
    <>
      <Router />

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
