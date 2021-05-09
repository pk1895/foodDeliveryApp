import React, { useState } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import MealsSummary from './components/Meals/MealsSummary';
import Meal from './components/Meals/Meal';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
function App() {
  const [cartShow, setCartShow] = useState(false);

  const hideModalHandler = () => {
    setCartShow(false);
  };

  const showModalHandler = () => {
    setCartShow(true);
  };

  return (
    <CartProvider>
      {cartShow && <Cart onCancelModal={hideModalHandler} />}
      <Header onShowModal={showModalHandler} />
      <main>
        <MealsSummary />
        <Meal />
      </main>
    </CartProvider>
  );
}

export default App;
