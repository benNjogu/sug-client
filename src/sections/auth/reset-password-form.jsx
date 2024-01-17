import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormProvider from '../../components/hook-form/form-provider';
import { Alert, Button, Stack } from '@mui/material';
import RHFTextfield from '../../components/hook-form/RHF-textfield';
import { ForgotPassword } from '../../redux/slices/auth';

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: 'username@provider.com',
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    //defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      try {
        //submit data to backend
        dispatch(ForgotPassword(data));
      } catch (error) {
        console.log(error);
        reset();
        setError('afterSubmit', {
          ...error,
          message: error.message,
        });
      }
    }, 2000);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {loading && (
        <div className="spinner">
          <div className="spinner-border" role="status" />
        </div>
      )}

      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextfield name="email" label="Enter email" />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#115581',
            color: (theme) =>
              theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: '#0D6EFD',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey',
            },
          }}
        >
          {'Reset Password'}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
