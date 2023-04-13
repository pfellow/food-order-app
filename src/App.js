import React, { useState } from "react";
import CartProvider from "./store/CartProvider";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider setCartOpen={setCartOpen}>
      {cartOpen && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
