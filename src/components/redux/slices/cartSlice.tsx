import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../utils/getCartFromLS';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';



export type ItemsType = {
  id: number;
  brand: string;
  price: string;
  imageUrl: string;
  raiting?: number;
  category?: string;
  count: number;
  year: string;
}


export type imagesType = {
  imgSrc: string;

}

export type FullAutoType = {
  id: number;
  brand: string;
  price: string;
  imageUrl: string;
  // imageOne: string;
  // imageTwo: string;
  year: string;
  numberPrice: number;
  raiting: number;
  discription: string;
  motor: string;
  transmission: string;
  engine: string;
  images: imagesType[];
}


export interface CartSliceState {
  totalPrice: number;
  items: ItemsType[];
}

const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice,
items
};

const cartSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addCar(state, action: PayloadAction<ItemsType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
     
      state.totalPrice = calcTotalPrice(state.items)
    },
    addFullCar(state, action: PayloadAction<FullAutoType>) {
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
        return Number(obj.price) * Number(obj.count) + sum;
      }, 0);
    },

    deleteCar(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearCart(state) {
      state.items = [];
    },

    plusCar(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return Number(obj.price) * obj.count + sum;
      }, 0);
    },
    minusCar(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        if (findItem.count < 1) {
          findItem.count = 1;
        }
      }
    
      state.totalPrice = calcTotalPrice(state.items)
    },
  },
});

export const { addCar, deleteCar, clearCart, minusCar, plusCar, addFullCar } = cartSlice.actions;
export default cartSlice.reducer;
