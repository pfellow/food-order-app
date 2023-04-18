import { useState, useRef, useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Checkout.module.css";
import Modal from "../UI/Modal";

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const [formIsNotCompleted, setFormIsNotCompleted] = useState(true);
  const [orderIsAccepted, setOrderIsAccepted] = useState(false);
  const confirmHandler = async (event) => {
    event.preventDefault();
    if (formIsNotCompleted) return;

    const order = {
      order: {
        items: cartCtx.items,
        totalAmount: cartCtx.totalAmount,
      },
      delivery: {
        name: nameInputRef.current.value,
        street: streetInputRef.current.value,
        postalCode: postalInputRef.current.value,
        city: cityInputRef.current.value,
      },
    };

    const response = await fetch(
      "https://react-http-b0b4e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      }
    );

    if (response.ok) {
      cartCtx.clearCart();
      setOrderIsAccepted(true);
    } else {
      alert("Something went wrong!");
    }
  };

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const checkFormHandler = () => {
    if (
      nameInputRef.current.value &&
      streetInputRef.current.value &&
      postalInputRef.current.value &&
      cityInputRef.current.value
    ) {
      setFormIsNotCompleted(false);
    } else {
      setFormIsNotCompleted(true);
    }
  };

  return (
    <Modal>
      {orderIsAccepted ? (
        <div className={classes.actions}>
          <p>Your order is accepted!</p>
          <button type="button" onClick={props.onCancel}>
            Close
          </button>
        </div>
      ) : (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              onChange={checkFormHandler}
              ref={nameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              onChange={checkFormHandler}
              ref={streetInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="postal">Postal Code</label>
            <input
              type="text"
              id="postal"
              onChange={checkFormHandler}
              ref={postalInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              onChange={checkFormHandler}
              ref={cityInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.submit} disabled={formIsNotCompleted}>
              Confirm
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default Checkout;
