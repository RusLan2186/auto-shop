import { useDispatch, useSelector } from 'react-redux';
import smile from './smile.png';
import cl from './Cart.module.scss';
import { addCar, clearCart, deleteCar, incremet } from '../redux/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import UiButton from '../auto/UI/Button/UiButton';

const Cart = () => {
  const autos = useSelector((store) => store.cart.items);
  const totalPrice = useSelector((store) => store.cart.totalPrice);

  const dispatch = useDispatch();

  const clickClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={cl.wrapper}>
      {autos.length > 0 ? (
        <div>
          <div className={cl.buttonClear}>
            <UiButton onClick={clickClearCart}>Clear Cart</UiButton>
          </div>
          {autos.map((auto) => (
            <CartItem key={uuidv4()} auto={auto} />
          ))}
          <div className={cl.totalWrapper}>
            <h2 className={cl.total__info}>
              Total count: <span>{autos.length}</span>{' '}
            </h2>
            <h2 className={cl.total__info}>
              Total Price: <span>{totalPrice} $</span>
            </h2>
          </div>
        </div>
      ) : (
        <div className={cl.emptyСart}>
          <h1 className={cl.title}>Why didn't you buy a car? </h1>
          <img className={cl.smile} src={smile} alt='smile' />
          <marquee scrollamount='30'>urgently buy a car!!!</marquee>
        </div>
      )}
    </div>
  );
};

export default Cart;
