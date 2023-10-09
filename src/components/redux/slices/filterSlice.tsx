import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type SortType ={
  title:string;
  sortProperty:string;
}

export interface SortCars{
  categiriesId:number;
  sort:SortType;

}

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
    setCotegoryId(state, action:PayloadAction<number>) {
      state.categiriesId = action.payload;
    },
    setSortAuto(state, action:PayloadAction<string>) {
      state.sort.title = action.payload;
    },
    setSortProperty(state, action:PayloadAction<string>) {
      state.sort.sortProperty = action.payload;
    },
  },
});

export const { setCotegoryId, setSortAuto, setSortProperty } = filterSlice.actions;
export default filterSlice.reducer;
