import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

import { ShowSnackbar } from './app';

const initialState = {
  applicationSpecs: [],
  applications: [],
  applicationNominees: [],
  applicationHR: [],
};

const slice = createSlice({
  name: 'application',
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

    updateApplicationHR(state, action) {
      state.applicationHR = action.payload.applicationHR;
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

export const FetchAllApplications = () => {
  return async (dispatch, getState) => {
    let org_id = window.localStorage.getItem('user_id');

    await axios
      .get(`/application/get-all-applications?org_id=${org_id}`, {
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

export const CreateNewApplication = (formValues) => {
  return async (dispatch, getState) => {
    let org_id = window.localStorage.getItem('user_id');
    await axios
      .post(
        '/application/create-new-application',
        { ...formValues, organization_id: org_id },
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

export const GetApplicationNominees = (application_id) => {
  return async (dispatch, getState) => {
    await axios
      .get(
        `/application/get-application-nominees?application_id=${application_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
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
          ShowSnackbar({ severity: 'error', message: error.data.message })
        );
      });
  };
};

export const GetApplicationHR = (application_id) => {
  return async (dispatch, getState) => {
    await axios
      .get(`/application/get-application-hr?application_id=${application_id}`, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        dispatch(
          slice.actions.updateApplicationHR({
            applicationHR: response.data.result1,
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