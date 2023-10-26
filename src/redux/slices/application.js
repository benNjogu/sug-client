import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  completeApplication: [],
};

const slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateCompleteApplication(state, action) {
      state.application = action.payload.application;
    },
  },
});

//Reducer
export default slice.reducer;

//Posting the complete application to the database
export const PostApplication = ({ formValues }) => {
  return async (dispatch, getState) => {
    await axios
      .post(
        '/applicaton/new-application',
        { ...formValues },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.updateCompleteApplication({
            completeApplication: response.data,
          })
        );
      });
  };
};
