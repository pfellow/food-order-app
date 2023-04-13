import React, { useRef, useState } from "react";
import styles from "./MealForm.module.css";
import Input from "../UI/Input";

export default function MealForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = +inputRef.current.value.trim();

    if (enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        label="Amount"
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount!</p>}
    </form>
  );
}
