import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [{ g_id: 1, label: 'Group 1' }],
  nominees: [],
  deletedNominee: [],
};

const slice = createSlice({
  name: 'cell',
  initialState,
  reducers: {
    updateGroups(state, action) {
      state.groups = action.payload.groups;
    },
    updateNominees(state, action) {
      state.nominees = action.payload.nominees;
    },
    updateDeletedNominee(state, action) {
      state.deletedNominee = action.payload.deletedNominee;
    },
  },
});

//Reducer
export default slice.reducer;

export function AddNewGroup(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateGroups({ groups: data }));
  };
}

export function AddNominee(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateNominees({ nominees: data }));
  };
}

export function DeletedNominee(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDeletedNominee({ deletedNominee: data }));
  };
}
