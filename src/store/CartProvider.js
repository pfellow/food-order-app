import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.item.id
  );
  const existingCartItem = state.items[existingCartItemIndex];
  let updatedItems = [...state.items];
  switch (action.type) {
    case "ADD": {
      const newTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
      };
    }

    case "REMOVE": {
      const newTotalAmount = state.totalAmount - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        updatedItems = updatedItems.filter(
          (item) => item.id !== action.item.id
        );
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
      };
    }

    default:
      return defaultCartState;
  }
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) =>
    dispatchCartAction({ type: "ADD", item: item });
  const removeItemFromCartHandler = (item) =>
    dispatchCartAction({ type: "REMOVE", item: item });

  const closeCartHandler = () => {
    props.setCartOpen(false);
  };
  const openCartHandler = () => {
    props.setCartOpen(true);
  };

  const openCheckoutHandler = () => {
    props.setCartOpen(false);
    props.setCheckoutOpen(true);
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    closeCart: closeCartHandler,
    openCart: openCartHandler,
    openCheckout: openCheckoutHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
