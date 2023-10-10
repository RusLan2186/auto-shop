import UiButton from './UI/Button/UiButton';
import Counter from '../counter/Counter';
import { addCar } from '../redux/slices/cartSlice';
import { AutoType } from './Auto';
import { useAppDispatch } from '../redux/store';



const AutoItem:React.FC<AutoType> = ({ id, brand, year, price, imageUrl }) => {
  const dispatch = useAppDispatch();
  let numberPrice:number = Number(price);
  let count:number = 1;
  const sendToCart = () => {
    const item = { id, brand, numberPrice, imageUrl, year, count };
 dispatch(addCar(item));
     };
  return (
    <div className='auto__item'>
      <a className='image__link' href='#'>
        <img className='auto__image' src={imageUrl} alt='auto' />
      </a>
      <div className='auto__description_items'>
        <div className='auto__discriptions'>
          <p> Brand: {brand}</p>
          <p> Year: {year}</p>
          <p> Price {price}$</p>
        </div>
        <div className='auto__actions'>
          <UiButton onClick={sendToCart}>Buy</UiButton>
          <Counter />
        </div>
      </div>
    </div>
  );
};

export default AutoItem;
