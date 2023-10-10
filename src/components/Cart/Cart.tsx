import {  useSelector } from 'react-redux';
import smile from './image/smile.png';
import cl from './Cart.module.scss';
import {  clearCart } from '../redux/slices/cartSlice';
import CartItem from './CartItem';
import UiButton from '../auto/UI/Button/UiButton';
import { RootState, useAppDispatch } from '../redux/store';

const Cart = () => {
  const autos = useSelector((store:RootState) => store.cart.items);
  const totalPrice = useSelector((store:RootState) => store.cart.totalPrice);
  const dispatch = useAppDispatch();

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
            // <CartItem key={uuidv4()} auto={auto} />
       
            <CartItem key={auto.id}  auto={auto} />
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
 
        </div>
      )}
    </div>
  );
};

export default Cart;
