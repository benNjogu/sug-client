import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

import { ShowSnackbar } from "./app";

const initialState = {
  applications: [],
  approved_applications: [],
  defferred_rejected_applications: [],
  admin_profile_data: {},
  nominees: [],
  deleted_nominees: [],
  admins: [],
  all_hr_managers: [],
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateApplications(state, action) {
      state.applications = action.payload.applications;
    },
    updateApprovedApplications(state, action) {
      state.approved_applications = action.payload.approved_applications;
    },
    updateDefferredAndRejectedApplications(state, action) {
      state.defferred_rejected_applications =
        action.payload.defferred_rejected_applications;
    },
    updateAdminProfile(state, action) {
      state.admin_profile_data = action.payload.admin_profile_data;
    },
    updateNominees(state, action) {
      state.nominees = action.payload.nominees;
    },
    updateDeletedNominees(state, action) {
      state.deleted_nominees = action.payload.deleted_nominees;
    },
    updateAllManagers(state, action) {
      state.all_hr_managers = action.payload.all_hr_managers;
    },
    updateAdmins(state, action) {
      state.admins = action.payload.admins;
    },
  },
});

//Reducer
export default slice.reducer;

export const FetchAllApplications = () => {
  return async (dispatch, getState) => {
    await axios
      .get(`/application/get-all-applications`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.updateApplications({
            applications: response.data.result,
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

export const FetchAllApprovedApplications = () => {
  return async (dispatch, getState) => {
    await axios
      .get(`/admin/get-approved-applications`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateApprovedApplications({
            approved_applications: response.data.result,
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

export const FetchAllDefferredAndRejectedApplications = () => {
  return async (dispatch, getState) => {
    await axios
      .get(`/admin/get-defferred-applications`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateDefferredAndRejectedApplications({
            defferred_rejected_applications: response.data.result,
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

export const FetchAllManagers = () => {
  return async (dispatch, getState) => {
    await axios
      .post(`/admin/get-all-hr-managers`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateAllManagers({
            all_hr_managers: response.data.data,
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

export const PostAdminProfileData = (formValues) => {
  return async (dispatch, getState) => {
    let user_id = window.localStorage.getItem("user_id");
    await axios
      .post(
        "/admin/post-admin-profile-data",
        { ...formValues, user_id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        dispatch(
          slice.actions.updateAdminProfile({
            admin_profile_data: response.data.data,
          })
        );
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      });
  };
};

export const GetAdminData = () => {
  let user_id = window.localStorage.getItem("user_id");
  return async (dispatch, getState) => {
    await axios
      .get(`/admin/get-admin-profile-data/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log("getting data", response);
        if (response.data.data === null) {
          dispatch(
            ShowSnackbar({ severity: "error", message: response.data.message })
          );
        }

        dispatch(
          slice.actions.updateAdminProfile({
            admin_profile_data: response.data.data,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
};

export const ApproveApplication = (data) => {
  let admin_id = window.localStorage.getItem("user_id");
  return async (dispatch, getState) => {
    await axios
      .post(
        "/admin/approve-application",
        { ...data, admin_id },
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

export const DefferOrRejectApplication = (data) => {
  let admin_id = window.localStorage.getItem("user_id");
  return async (dispatch, getState) => {
    await axios
      .post(
        "/admin/deffer-or-reject-application",
        { ...data, admin_id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
};

export const FetchAllNominees = () => {
  return async (dispatch, getState) => {
    await axios
      .post("/nominee/get-all-nominees", {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateNominees({
            nominees: response.data.result,
          })
        );
      })
      .catch(function (error) {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
};

export const FetchAllDeletedNominees = () => {
  return async (dispatch, getState) => {
    await axios
      .post("/nominee/get-all-deleted-nominees", {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateDeletedNominees({
            deleted_nominees: response.data.result,
          })
        );
      })
      .catch(function (error) {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
};

export const DisableNominee = (nominee_id) => {
  return async (dispatch, getState) => {
    await axios
      .get(`/nominee/disable-nominee/${nominee_id}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response);

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
};

export const DisableOrganization = (organization_id) => {
  return async (dispatch, getState) => {
    await axios
      .get(`/organization/disable-organization/${organization_id}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response);

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
};

export const FetchAllAdmins = () => {
  return async (dispatch, getState) => {
    await axios
      .post("/admin/get-all-admins", {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateAdmins({
            admins: response.data.data,
          })
        );
      })
      .catch(function (error) {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
};
