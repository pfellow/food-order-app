import React, { useState } from "react";
import CartProvider from "./store/CartProvider";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";
import Checkout from "./component/Checkout/Checkout";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <CartProvider setCartOpen={setCartOpen} setCheckoutOpen={setCheckoutOpen}>
      {cartOpen && <Cart />}
      {checkoutOpen && <Checkout onCancel={() => setCheckoutOpen(false)} />}
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
