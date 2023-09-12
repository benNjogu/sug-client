import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormProvider from '../../components/hook-form/FormProvider';
import { Alert, Button, Stack } from '@mui/material';
import RHFTextfield from '../../components/hook-form/RHFTextfield';
import { ForgotPassword } from '../../redux/slices/auth';

const ResetPasswordForm = () => {
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
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
            bgcolor: '#0D6EFD',
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
