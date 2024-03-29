import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Stack } from '@mui/material';

import RHFCodes from '../../components/hook-form/RHF-codes';
import FormProvider from '../../components/hook-form/form-provider';
import { VerifyEmail } from '../../redux/slices/auth';
import { useState } from 'react';

const VerifyForm = () => {
  const dispatch = useDispatch();
  //email => get it from the store
  const { email } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    // defaultValues
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      try {
        // SEND API REQUEST
        dispatch(
          VerifyEmail({
            email,
            otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
          })
        );
      } catch (error) {
        console.log(error);
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
        {/* Custom OTP input */}
        <RHFCodes
          keyName="code"
          inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
        />
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
          {'Verify'}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default VerifyForm;
