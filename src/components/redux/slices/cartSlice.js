import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addCar(state, action) {
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

    deleteCar(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.numberPrice * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
    },

    plusCar(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.numberPrice * obj.count + sum;
      }, 0);
    },
    minusCar(state, action) {
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
