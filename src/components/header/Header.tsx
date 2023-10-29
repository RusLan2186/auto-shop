import { useState, useRef, useEffect } from 'react';
import RegistationForm from './RegistrationForm';
import { NavLink } from 'react-router-dom';
import HeaderModal from './HeaderModal';
import FormHeader from './FormHeader';
import { enterSite } from './headerConstants';
import cart from '../cart/image/cart.png';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [regModal, setRegModal] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [openBurger, setOpenBurger] = useState<boolean>(false);
  const [cartAutosQuality, setCartAutosQuality] = useState<number>(0);
const cartAutos = useSelector((store: RootState) => store.cart.items);
const isMounted = useRef(false)
console.log(cartAutos);


  useEffect(() => {
    setCartAutosQuality(cartAutos.length);
  }, [cartAutos]);

  const bodyEl = document.body;
  if (openBurger) {
    bodyEl.classList.add('lock');
  } else {
    bodyEl.classList.remove('lock');
  }

  useEffect(() =>{

    if(isMounted.current){
      const json = JSON.stringify(cartAutos)
      localStorage.setItem('cart',json)
      }
  isMounted.current = true;
   
  },[cartAutos])

  return (
    <div ref={divRef} className='header'>
      <div className='header__container container'>
        <div className='header__logo'>
          <NavLink to='/'>
            <strong className='strong'>
              Auto <span>Shop</span>
            </strong>
          </NavLink>
        </div>
        <div className='heafer__menu_items'>
          <nav className={!openBurger ? 'header__menu' : 'header__menu open-menu'}>
            <img
              className='header-image'
              onClick={() => setOpenModal(!openModal)}
              src={enterSite}
              alt='enter'
            />
            <span onClick={() => setRegModal(!regModal)} className='header__link'>
              Registration
            </span>
            <a className='header__link header__link_tel' href='tel:+3 050- 555 -66 -77'>
              +3 050- 555 -66 -77
            </a>

          </nav>
          <NavLink to='cart' className='cart'>
            <img className='header-image header-image-cart' src={cart} alt='cart' />
            <p className='header__link'>{cartAutosQuality}</p>
          </NavLink>
          <div
            onClick={() => setOpenBurger(!openBurger)}
            className={!openBurger ? 'header__burger' : ' header__burger open-menu'}
          >
            <span></span>
          </div>
        </div>
      </div>

      <HeaderModal visible={openModal} changeVisible={setOpenModal}>
        <FormHeader openModal={openModal} />
      </HeaderModal>

      <HeaderModal visible={regModal} changeVisible={setRegModal}>
        <RegistationForm regModal={regModal} />
      </HeaderModal>
    </div>
  );
};

export default Header;
