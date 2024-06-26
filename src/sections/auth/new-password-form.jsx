import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash } from "phosphor-react";

import FormProvider from "../../components/hook-form/form-provider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import RHFTextfield from "../../components/hook-form/RHF-textfield";
import { ResetPassword } from "../../redux/slices/auth";

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();

  const NewPassWordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordConfirm: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const defaultValues = {
    password: "my_passWord.",
    passwordConfirm: "my_passWord.",
  };

  const methods = useForm({
    resolver: yupResolver(NewPassWordSchema),
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
      try {
        //submit data to backend
        dispatch(
          ResetPassword({ ...data, token: queryParameters.get("token") })
        );
      } catch (error) {
        console.log(error);
        reset();
        setError("afterSubmit", {
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
        <RHFTextfield
          name="password"
          label="Enter new password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextfield
          name="passwordConfirm"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#115581",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "#0D6EFD",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey",
            },
          }}
        >
          {"Submit"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
