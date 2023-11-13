import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cells: [{ id: 1 }],
  nominees: [],
};

const slice = createSlice({
  name: 'cell',
  initialState,
  reducers: {
    updateCells(state, action) {
      state.cells = action.payload.cells;
    },
    updateNominees(state, action) {
      state.nominees = action.payload.nominees;
    },
  },
});

//Reducer
export default slice.reducer;

export function AddNewCell() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateCells({ cells: { id: 2 } }));
  };
}

export function AddNominee(data) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateNominees({ nominees: data }));
  };
}
