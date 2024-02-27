import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

import { ShowSnackbar } from './app';

const initialState = {
  applications: [],
  admin_profile_data: {},
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateApplications(state, action) {
      state.applications = action.payload.applications;
    },
    updateAdminProfile(state, action) {
      state.admin_profile_data = action.payload.admin_profile_data;
    },
  },
});

//Reducer
export default slice.reducer;

export const FetchAllApplications = () => {
  return async (dispatch, getState) => {
    await axios
      .get(`/application//get-all-applications`, {
        headers: {
          'Content-Type': 'application/json',
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
          ShowSnackbar({ severity: 'error', message: error.data.message })
        );
      });
  };
};

export const PostAdminProfileData = (formValues) => {
  return async (dispatch, getState) => {
    let user_id = window.localStorage.getItem('user_id');
    await axios
      .post(
        '/admin/post-admin-profile-data',
        { ...formValues, user_id },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        dispatch(
          slice.actions.updateAdminProfile({
            admin_profile_data: response.data.data,
          })
        );
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: 'success', message: response.data.message })
        );
      });
  };
};

export const GetAdminData = () => {
  let user_id = window.localStorage.getItem('user_id');
  return async (dispatch, getState) => {
    await axios
      .get(`/admin/get-admin-profile-data/${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log('getting data', response);
        if (response.data.data === null) {
          dispatch(
            ShowSnackbar({ severity: 'error', message: response.data.message })
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
        dispatch(ShowSnackbar({ severity: 'error', message: error.message }));
      });
  };
};

export const ApproveApplication = (data) => {
  let admin_id = window.localStorage.getItem('user_id');
  return async (dispatch, getState) => {
    await axios
      .post(
        '/admin/approve-application',
        { ...data, admin_id },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: 'success', message: response.data.message })
        );
      });
  };
};
