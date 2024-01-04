import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  applicationSpecs: [],
  applications: [],
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
  },
});

//Reducer
export default slice.reducer;

export const UpdateApplicationSpecs = ({ data }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateApplicationSpecs({ specs: data }));
  };
};

export const CreateNewApplication = (formValues) => {
  return async (dispatch, getState) => {
    await axios
      .post(
        '/application/create-new-application',
        { ...formValues },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        console.log(response);
        // dispatch(
        //   slice.actions.updateApplications({
        //     applications: [...response.data],
        //   })
        // );
      });
  };
};