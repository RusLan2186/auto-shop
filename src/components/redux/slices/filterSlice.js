import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categiriesId: 0,
  sort: {
    title: 'brand',
    sortProperty: 'brand',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCotegoryId(state, action) {
      state.categiriesId = action.payload;
    },
    setSortAuto(state, action) {
      state.sort.title = action.payload;
    },
    setSortProperty(state, action) {
      state.sort.sortProperty = action.payload;
    },
  },
});

export const { setCotegoryId, setSortAuto, setSortProperty } = filterSlice.actions;
export default filterSlice.reducer;
