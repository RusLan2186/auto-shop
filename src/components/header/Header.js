import { useState, useRef, useEffect } from 'react';
import RegistationForm from './RegistrationForm';
import { NavLink } from 'react-router-dom';
import HeaderModal from './HeaderModal';
import FormHeader from './FormHeader';
import { enterSite } from '../header/headerConstants';
import cart from '../img/Cart/cart.png';
import { useSelector } from 'react-redux';

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [regModal, setRegModal] = useState(false);
  const divRef = useRef();
  const [openBurger, setOpenBurger] = useState(false);
  const [cartAutosQuality, setCartAutosQuality] = useState(0);

  const cartAutos = useSelector((store) => store.cart.items);

  useEffect(() => {
    setCartAutosQuality(cartAutos.length);
  }, [cartAutos]);

  const bodyEl = document.body;
  if (openBurger) {
    bodyEl.classList.add('lock');
  } else {
    bodyEl.classList.remove('lock');
  }

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
          <NavLink onClick={() => setOpenBurger(!openBurger)} to='cart' className='cart'>
            <img className='header-image header-image-cart' src={cart} alt='cart' />
            <p className='header__link'>{cartAutosQuality}</p>
          </NavLink>
        </nav>
        <div
          onClick={() => setOpenBurger(!openBurger)}
          className={!openBurger ? 'header__burger' : ' header__burger open-menu'}
        >
          <span></span>
        </div>
      </div>

      <HeaderModal visible={openModal} changeVisible={setOpenModal}>
        <FormHeader openModal={openModal} changeOpenModal={setOpenModal} />
      </HeaderModal>

      <HeaderModal visible={regModal} changeVisible={setRegModal}>
        <RegistationForm regModal={regModal} />
      </HeaderModal>
    </div>
  );
};

export default Header;
