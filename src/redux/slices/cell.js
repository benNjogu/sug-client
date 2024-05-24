import { createSlice } from "@reduxjs/toolkit";

import { constants } from "../../data/constants";

const initialState = {
  newGroups: {
    id: {
      g_id: constants.FIRST_GROUP_ID,
      label: constants.FIRST_GROUP_LABEL,
      start_date: "",
      end_date: "",
      nominees: [],
    },
  },
  combinedNominees: [],
  nominees: [],
  deletedNominee: [],
  capacity: {
    capacity: {
      minCapacity: 4,
      maxCapacity: 25,
    },
  },
};

const slice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    updateGroups(state, action) {
      state.newGroups = action.payload.groups;
    },
    updateCombinedNominees(state, action) {
      state.combinedNominees = action.payload.nominee;
    },
    updateNominees(state, action) {
      state.nominees = action.payload.nominees;
    },
    updateDeletedNominee(state, action) {
      state.deletedNominee = action.payload.deletedNominee;
    },
    updateCapacity(state, action) {
      state.capacity.capacity = action.payload.capacity;
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

export function UpdateCombinedNominees(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateCombinedNominees({ nominee: data }));
  };
}

export function AddNominee(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateGroups({ groups: data }));
  };
}

export function DeletedNominee(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDeletedNominee({ deletedNominee: data }));
  };
}

export function UpdateCapacity(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateCapacity({ capacity: data }));
  };
}
