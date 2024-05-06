import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { ShowSnackbar } from "./app";
import { message } from "antd";

const initialState = {
  nominees: [],
  nominee_details: [],
};

const slice = createSlice({
  name: "register-nominee",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.nominee_details = action.payload.nominee_details;
    },
    fetchAllUsers(state, action) {
      state.nominees = action.payload.nominees;
    },
  },
});

export default slice.reducer;

export function RegisterUser(formValues) {
  let org = window.localStorage.getItem("user_id");
  formValues = { ...formValues, organization: org };
  return async (dispatch, getState) => {
    await axios
      .post(
        "/nominee/register-nominee",
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
        console.log(response);

        dispatch(
          slice.actions.registerUser({
            nominee_details: response.data.data,
          })
        );

        dispatch(
          ShowSnackbar({
            severity: "success",
            message: response.data.message,
          })
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

export function FetchAllRegisteredUsers(org) {
  return async (dispatch, getState) => {
    await axios
      .get(`/nominee/get-nominees/${org}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response);

        dispatch(
          slice.actions.fetchAllUsers({
            nominees: response.data.result,
          })
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

export function EditNominee(data) {
  console.log("org", data);
  return async (dispatch, getState) => {
    await axios
      .post(
        `/nominee/edit-nominee`,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        message.success(response.data.message);
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
