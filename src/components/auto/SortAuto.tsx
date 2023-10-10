import { useEffect, useRef, useState } from 'react';
import { brand, year, price, raitingMin, raitingPlus, sortedBy } from './constAuto';
import { useSelector } from 'react-redux';
import { SortType, setSortAuto, setSortProperty } from '../redux/slices/filterSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { AutoType } from './Auto';



interface AutoSortProps{
  autos:AutoType[];
 changeAuto:(autos:AutoType[]) =>void;
  }

  type M = MouseEvent & {
    path: Node[];
    e:React.MouseEvent<HTMLElement>
}

const SortAuto:React.FC<AutoSortProps> = ({ autos, changeAuto }) => {
  const dispatch = useAppDispatch();
  const sortTitle = useSelector((state:RootState) => state.filters.sort.title);
  const sortRef = useRef<HTMLDivElement>(null);
const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event:M) => {
      if(sortRef.current)
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
  
// @ts-ignore
    document.body.addEventListener('click', handleClickOutside ) ;
    return () => {
// @ts-ignore
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);



  let result:AutoType[];
  
  const sortBy = (field:string) => {

  if (field === brand) {
    
      result = [...autos].sort((a, b) => a['brand'].localeCompare(b['brand']));
    }
    if (field === year) {
      result = [...autos].sort((a, b) => +a.year - +b.year);
     }

   if (field === price) {
      result = [...autos].sort((a, b) => +a.price - +b.price);
    }
    if (field === raitingPlus) {
      result = [...autos].sort((a, b) => a.raiting - b.raiting);
 
    }
    if (field === raitingMin) {
      result = [...autos].sort((a, b) => b.raiting - a.raiting);
    }

    changeAuto(result);
    setOpen(false);
    dispatch(setSortAuto(field));
  };

  return (
    <div className='sort__wrapper' ref={sortRef}>
      <span> {sortedBy}:</span>
      <span className='sort__open' onClick={() => setOpen(!open)}>
        {sortTitle}{' '}
      </span>
      {open && (
        <div>
          <ul className='auto__sort'>
            <li onClick={() => sortBy(brand)}>{brand}</li>
            <li onClick={() => sortBy(year)}>{year}</li>
            <li onClick={() => sortBy(price)}>{price}</li>
            <li onClick={() => sortBy(raitingMin)}>{raitingMin} </li>
            <li onClick={() => sortBy(raitingPlus)}>{raitingPlus}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortAuto;
