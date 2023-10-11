import './scss/App.scss';
import './scss/Reset.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/Main';
import Cart from './components/cart/Cart';
import FullAuto from './components/auto/fullauto/FullAuto';

const App:React.FC = () => {

return (
    <div className='wrapper'>
      <Header />
  <div>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/fullauto/:id' element={<FullAuto />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
