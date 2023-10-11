import React from 'react';
import cl from './Cart.module.scss';
import { ItemsType, deleteCar, minusCar, plusCar } from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';

interface CartItemProps {

  auto: ItemsType;
}

const CartItem: React.FC<CartItemProps> = ({ auto }) => {
  const dispatch = useAppDispatch();


  const removeAuto = () => {
    dispatch(deleteCar(auto.id));
  };

  const onClickPlus = () => {
    dispatch(plusCar(auto.id));
  };

  const onClickMinus = () => {
    dispatch(minusCar(auto.id));
  };



  return (
    <div className={cl.cartItemWContainer}>
      <div className={cl.cartItem}>
        <Link className={cl.link} to={`/fullauto/${auto.id}`}>   <img className={cl.imageCar} src={auto.imageUrl} alt='auto' /></Link>
        {/* <img className={cl.imageCar} src={auto.imageUrl} alt='auto' /> */}
        <div className={cl.autoDiscription}>
          <p className={cl.brand}>
            Brand: <span>{auto.brand}</span>
          </p>
          <div className={cl.discriptionItems}>
            <div className={cl.discrptionItem}>
              <div className={cl.counterButtons}>
                <button className={cl.counterButton} onClick={onClickPlus}>
                  +
                </button>
                <p> {auto.count}</p>
                <button
                  className={auto.count === 1 ? cl.noActive : cl.counterButton}
                  onClick={onClickMinus}
                >
                  -
                </button>
              </div>
              <div>
                <p className={cl.price}>
                  {/* <span>Price:</span> {auto.numberPrice * auto.count} $ */}

                  <span>Price:</span> {Number(auto.price) * auto.count} $
                </p>
              </div>
            </div>
            <div>
              <p className={cl.deleteButton}>
                <button className={cl.counterButton} onClick={removeAuto}>
                  Delete
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
