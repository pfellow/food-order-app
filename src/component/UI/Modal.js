import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CartContext from "../../store/cart-context";

import styles from "./Modal.module.css";

export default function Modal(props) {
  const closeHandler = useContext(CartContext).closeCart;
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className={styles.backdrop} onClick={closeHandler}></div>
          <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
          </div>
        </>,
        document.querySelector("#modal-root")
      )}
    </>
  );
}
