import './App.css';
import { Routes, Route } from 'react-router-dom'
import Exchanges from './component/Exchanges';
import Coins from './component/Coins';
import CoinDetails from './component/CoinDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Exchanges />} />
      <Route path='/coin' element={<Coins />} />
      <Route path='/coin/:id' element={<CoinDetails />} />
    </Routes>
  );
}

export default App;
