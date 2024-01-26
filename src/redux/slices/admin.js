import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

import { ShowSnackbar } from './app';

const initialState = {
  applications: [],
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateApplications(state, action) {
      state.applications = action.payload.applications;
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
