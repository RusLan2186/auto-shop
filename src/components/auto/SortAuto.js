import { useEffect, useRef, useState } from 'react';
import { brand, year, price, raitingMin, raitingPlus, sortedBy } from './constAuto';
import { useDispatch, useSelector } from 'react-redux';
import { setSortAuto, setSortProperty } from '../redux/slices/filterSlice';

const SortAuto = ({ autos, changeAuto }) => {
  const dispatch = useDispatch();
  const sortTitle = useSelector((state) => state.filters.sort.title);
  const sortRef = useRef();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const sortBy = (field) => {
    let result;

    if (field === brand) {
      result = [...autos].sort((a, b) => {
        if (a['brand'] < b['brand']) return -1;
      });
    }
    if (field === year) {
      result = [...autos].sort((a, b) => a.year - b.year);
    }
    if (field === price) {
      result = [...autos].sort((a, b) => a.price - b.price);
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
