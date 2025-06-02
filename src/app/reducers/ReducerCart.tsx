export interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItemProps }
  | { type: "REMOVE_ITEM"; payload: number };

export const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export interface CartState {
  cart: CartItemProps[];
  totalQuantity: number;
  totalPrice: number;
}

export function reducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case "ADD_ITEM":
      const findItemAdd = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (findItemAdd) {
        console.log("Item found");
        const updatedCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        return {
          ...state,
          cart: updatedCart,
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        const newCart = [...state.cart, action.payload];

        return {
          ...state,
          cart: newCart,
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
      break;

    case "REMOVE_ITEM":
      const findItemRemove = state.cart.find(
        (item) => item.id === action.payload
      );

      if (findItemRemove) {
        const filterCart = state.cart.filter(
          (item) => item.id !== action.payload
        );

        const updateQuantity = state.totalQuantity - findItemRemove.quantity;
        const updatePrice =
          state.totalPrice - findItemRemove.price * findItemRemove.quantity;

        return {
          ...state,
          cart: filterCart,
          totalQuantity: updateQuantity,
          totalPrice: updatePrice,
        };
      } else {
        return state;
      }

    default:
      throw new Error();
  }
}

{
  /*import React from "react";
import Cart from "../components/Cart";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      break;

    case "REMOVE_ITEM":
      break;
  }
}*/
}
