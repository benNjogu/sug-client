import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cells: [{ id: 1 }],
};

const slice = createSlice({
  name: 'cell',
  initialState,
  reducers: {
    updateCells(state, action) {
      state.cells = action.payload.cells;
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
