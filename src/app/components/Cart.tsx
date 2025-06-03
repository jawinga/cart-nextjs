import React, { useMemo } from "react";
import CartItem from "./CartItem";
import { CartItemProps } from "../reducers/ReducerCart";

interface CartItemListProps {
  cart: CartItemProps[];
  removeItem: (item: CartItemProps) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  incrementQuantity: (item: CartItemProps) => void;
  decreaseQuantity: (item: CartItemProps) => void;
}

const Cart = ({
  cart,
  removeItem,
  totalPrice,
  setTotalPrice,
  incrementQuantity,
  decreaseQuantity,
}: CartItemListProps) => {
  const usingMemoItem = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Your Shopping Cart
      </h2>

      <div className="flex flex-col gap-6">
        {cart.map((item) => {
          return (
            <CartItem
              key={item.id}
              removeItem={removeItem}
              item={item}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              incrementQuantity={incrementQuantity}
              decreaseQuantity={decreaseQuantity}
            ></CartItem>
          );
        })}
      </div>

      {cart.length >= 1 && (
        <div className="mt-8 flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            Total: ${usingMemoItem}
          </p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
            Checkout
          </button>
        </div>
      )}

      {cart.length < 1 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed rounded-lg">
          <p className="text-lg font-medium">Your basket is empty</p>
          <p className="text-sm">Add items to get started</p>
        </div>
      )}
    </section>
  );
};

export default Cart;
