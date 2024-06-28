import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

import { ShowSnackbar } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  error: false,
  account_type: "",
  user_data: {},
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
    updateUserEmail(state, action) {
      state.email = action.payload.email;
    },
    updateUserData(state, action) {
      state.user_data = action.payload.user_data;
    },
  },
});

export default slice.reducer;

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.data.active === 0) {
          dispatch(
            ShowSnackbar({
              severity: "error",
              message: "Account disabled! Contact NITA.",
            })
          );

          return;
        }
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        dispatch(
          slice.actions.updateUserData({
            user_data: { ...response.data.data },
          })
        );

        console.log("first login response", response);
        window.localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("token", response.data.token);

        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("token");

    dispatch(slice.actions.logout());
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
}

export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
      })
      .catch((error) => console.log(error));
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateUserEmail({ email: formValues.email }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );

        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify-otp";
        }
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/verify",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        dispatch(
          slice.actions.updateUserData({
            user_data: { ...response.data.data },
          })
        );

        window.localStorage.setItem("user_id", response.data.user_id);
        window.localStorage.setItem("token", response.data.token);

        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch((error) => {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
        console.log(error);
      });
  };
}
