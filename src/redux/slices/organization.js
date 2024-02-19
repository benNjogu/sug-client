import { createSlice } from '@reduxjs/toolkit';

import axios from '../../utils/axios';
import { ShowSnackbar } from './app';

const initialState = {
  organization_profile_data: {},
};

const slice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    updateOrganizationProfile(state, action) {
      state.organization_profile_data =
        action.payload.organization_profile_data;
    },
  },
});

//Reducer
export default slice.reducer;

export const PostOrganizationProfileData = (formValues) => {
  return async (dispatch, getState) => {
    let organization_id = window.localStorage.getItem('user_id');
    await axios
      .post(
        '/organization/post-organization-profile-data',
        { ...formValues, organization_id },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        dispatch(
          slice.actions.updateOrganizationProfile({
            organization_profile_data: response.data.data,
          })
        );
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: 'success', message: response.data.message })
        );
      });
  };
};

export const GetOrganizationData = () => {
  let organization_id = window.localStorage.getItem('user_id');
  return async (dispatch, getState) => {
    await axios
      .get(`/organization/get-organization-profile-data/${organization_id}`, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log('getting data', response);

        dispatch(
          slice.actions.updateOrganizationProfile({
            organization_profile_data: response.data.data,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(ShowSnackbar({ severity: 'error', message: error.message }));
      });
  };
};
