import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  //organizations as users
  users: [],
  // application taken
  adminOnIt: "",
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateAdminOnIt(state, action) {
      state.adminOnIt = action.payload.adminOnIt;
    },
  },
});

//Reducer
export default slice.reducer;

export function ShowSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackbar({
        severity,
        message,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };
}

export const CloseSnackbar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

//Fetching all organizations for admin panel
export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateUsers({
            users: response.data.data,
          })
        );
      })
      .catch((error) => console.log(error));
  };
};

export const UpdateAdminOnIt = (data) => async (dispatch, getState) => {
  dispatch(slice.actions.updateAdminOnIt({ adminOnIt: data }));
};
