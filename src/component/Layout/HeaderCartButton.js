import CartIcon from "../Cart/CartIcon";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

export default function HeaderCartButton() {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const { items } = useContext(CartContext);
  const cartQuantity = items.reduce(
    (quantity, item) => (quantity += item.amount),
    0
  );
  const openCart = useContext(CartContext).openCart;
  const btnClasses = `${styles.button} ${btnIsHighLighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;

    setBtnIsHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={openCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{cartQuantity}</span>
    </button>
  );
}
