import { useEffect, useState } from 'react';
import axios from 'axios';
import AutoList from './AutoList';
// import { audiCar, bmwCar, mercCar, ladaCar, toyotaCar, mitsubCar } from './carsImages'
import Loader from '../Loader/Loader';
import Categories from './Categories';
import { useDispatch, useSelector } from 'react-redux';
import { setCotegoryId } from '../redux/slices/filterSlice';

const Auto = () => {
  const [autos, setAutos] = useState([]);
  const [autosLoading, setAutosLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const dispatch = useDispatch();
  const activeCathegorie = useSelector((state) => state.filters.categiriesId);

  useEffect(() => {
    setAutosLoading(true);
    axios
      .get(
        `https://64cbc2282eafdcdc85194590.mockapi.io/autos?${
          activeCathegorie > 0 ? `category=${activeCathegorie}` : ''
        }`,
      )
      .then((res) => {
        setAutos(res.data);
        setAutosLoading(false);
        setLoadError('');
      })
      .catch((e) => {
        setLoadError(e.message);
        setAutosLoading(false);
      });
  }, [activeCathegorie]);

  // const[autos,setAutos] = useState(autosItems)

  // const [autos, setAutos] = useState([
  //    { id: '3', brand: "Audi", year: '2012', price: '500000', image: `${audiCar}` },
  //    { id: '1', brand: "Bmw", year: '2020', price: '15000', image: `${bmwCar}` },
  //    { id: '2', brand: "Mercedes", year: '2022', price: '300000', image: `${mercCar}` },
  //    { id: '4', brand: "Toyota", year: '2005', price: '18000', image: `${toyotaCar}` },
  //    { id: '5', brand: "Mitsubisy", year: '2023', price: '19000', image: `${mitsubCar}` },
  //    { id: '6', brand: "Lada", year: '2000', price: '9000', image: `${ladaCar}` },

  // ])

  return (
    <div>
      <h1 className='title'>Choose your dream</h1>
      <Categories
        activeCategorie={activeCathegorie}
        onClickCategorie={(id) => dispatch(setCotegoryId(id))}
      />

      {loadError && <strong className='error__load'>An error has occurred ${loadError}!!!</strong>}
      {autosLoading ? (
        <div className='loader__block'>
          {' '}
          <Loader />
        </div>
      ) : (
        <div>
          {' '}
          <AutoList title={'Choose your dream'} autos={autos} changeAutos={setAutos} />{' '}
        </div>
      )}
    </div>
  );
};

export default Auto;
