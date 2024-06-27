import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/hook-form/form-provider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import RHFTextfield from "../../components/hook-form/RHF-textfield";
import { Eye, EyeSlash } from "phosphor-react";
import { RegisterUser } from "../../redux/slices/auth";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string().required("Name of organization is required."),
    levyNumber: Yup.string().required("Levy registration number is required."),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    //defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      try {
        //submit data to backend
        dispatch(RegisterUser(data));
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

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextfield name="userName" label="Name of organization" />
          <RHFTextfield name="levyNumber" label="Levy registration number" />
        </Stack>

        <RHFTextfield name="email" label="Enter organization's email" />
        <RHFTextfield
          name="password"
          label="Create password"
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
          {"Create Account"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
