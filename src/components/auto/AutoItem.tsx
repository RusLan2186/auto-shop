import UiButton from './UI/Button/UiButton';
import Counter from '../counter/Counter';
import { addCar } from '../redux/slices/cartSlice';
import { AutoType } from './Auto';
import { useAppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';



const AutoItem: React.FC<AutoType> = ({ id, brand, year, price, imageUrl }) => {
  const dispatch = useAppDispatch();
  let count: number = 1;
  const sendToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const item = { id, brand, price, imageUrl, count, year };
    dispatch(addCar(item));
  };
  return (
    <div className='auto__item'>
      <Link  to={`/fullauto/${id}`} className='image__link' >
        <img className='auto__image' src={imageUrl} alt='auto' />
      </Link>
      <div className='auto__description_items'>
        <div className='auto__discriptions'>
          <p> Brand: {brand}</p>
          <p> Year: {year}</p>
          <p> Price {price}$</p>
        </div>
        <div className='auto__actions'>
          <UiButton onClick={sendToCart}>Buy</UiButton>
          <Counter />
          <Link className="link" to={`/fullauto/${id}`}>Details </Link>
        </div>
      </div>
    </div>
  );
};

export default AutoItem;
