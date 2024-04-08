import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

import { ShowSnackbar } from "./app";

const initialState = {
  applicationSpecs: [],
  applications: [],
  applicationNominees: [],
  applicationDates: [],
  applicationHR: [],
  bannerData: [],
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateApplicationSpecs(state, action) {
      state.applicationSpecs = action.payload.specs;
    },

    updateApplications(state, action) {
      state.applications = action.payload.applications;
    },

    updateApplicationNominees(state, action) {
      state.applicationNominees = action.payload.applicationNominees;
    },

    updateApplicationDates(state, action) {
      state.applicationDates = action.payload.applicationDates;
    },

    updateApplicationHR(state, action) {
      state.applicationHR = action.payload.applicationHR;
    },

    updateBannerData(state, action) {
      state.bannerData = action.payload.bannerData;
    },
  },
});

//Reducer
export default slice.reducer;

export const UpdateApplicationSpecs = ({ data }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateApplicationSpecs({ specs: data }));
  };
};

export const FetchOrganizationApplications = () => {
  return async (dispatch, getState) => {
    let org_id = window.localStorage.getItem("user_id");

    await axios
      .get(`/application/get-organization-applications?org_id=${org_id}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateApplications({
            applications: response.data.result,
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
};

export const CreateNewApplication = (formValues) => {
  return async (dispatch, getState) => {
    let org_id = window.localStorage.getItem("user_id");
    await axios
      .post(
        "/application/create-new-application",
        { ...formValues, organization_id: org_id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        console.log(response);
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
};

export const GetApplicationNominees = (application_id) => {
  return async (dispatch, getState) => {
    await axios
      .get(
        `/application/get-application-nominees?application_id=${application_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.updateApplicationNominees({
            applicationNominees: response.data.result,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          ShowSnackbar({ severity: "error", message: error.data.message })
        );
      });
  };
};

export const GetApplicationGroupDates = (application_id) => {
  return async (dispatch, getState) => {
    await axios
      .get(
        `/application/get-application-group-dates?application_id=${application_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.updateApplicationDates({
            applicationDates: response.data.result,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          ShowSnackbar({ severity: "error", message: error.data.message })
        );
      });
  };
};

export const GetApplicationHR = (application_id) => {
  return async (dispatch, getState) => {
    await axios
      .get(`/application/get-application-hr?application_id=${application_id}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response, "hr");
        dispatch(
          slice.actions.updateApplicationHR({
            applicationHR: response.data.result1,
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
};

export const UpdateAdminWorkingOnApplication = (
  application_id,
  current_admin_id,
  admin_id
) => {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/application/update-admin-working-on-application",
        { application_id, current_admin_id, admin_id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
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
};

/**
 * @param {*} status
 * 0 - for Rejected and Deffered applications.
 * 1 - for Approved applications.
 */
export const GetBannerData = (application_id, status) => {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/application/get-banner-data",
        { application_id, status },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        console.log("banner-data", response);
        dispatch(
          slice.actions.updateBannerData({
            bannerData: response.data.result,
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
};
