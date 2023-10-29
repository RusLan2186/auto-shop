import { ItemsType } from "../components/redux/slices/cartSlice";

export const calcTotalPrice = (items:ItemsType[]) => {
  return items.reduce((sum, obj) => {
      return Number(obj.price) * obj.count + sum;
    }, 0);
}