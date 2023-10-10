import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export type ItemsType={
  id:number;
  brand:string;
  price?:string;
  imageUrl:string;
  raiting?:number;
  category?:string;
  count:number;
  numberPrice:number;
  year:string;
}




export interface CartSliceState{
  totalPrice:number;
  items:ItemsType[];
}

const initialState:CartSliceState  = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addCar(state, action:PayloadAction<ItemsType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.numberPrice * obj.count + sum;
      }, 0);
    },

    deleteCar(state, action:PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.numberPrice * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
    },

    plusCar(state, action:PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.numberPrice * obj.count + sum;
      }, 0);
    },
    minusCar(state, action:PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        if (findItem.count < 1) {
          findItem.count = 1;
        }
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.numberPrice * obj.count + sum;
      }, 0);
    },
  },
});

export const { addCar, deleteCar, clearCart, minusCar, plusCar } = cartSlice.actions;
export default cartSlice.reducer;
