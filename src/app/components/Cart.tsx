"use client";

import { useMemo } from "react";
import CartItem from "./CartItem";
import type { CartItemProps } from "../reducers/ReducerCart";

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
    <section className="sticky top-8 h-fit w-full">
      <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/80">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-slate-300">
            Shopping Cart
          </h2>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white">
            {cart.length}
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
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
              />
            );
          })}
        </div>

        {/* Cart Summary */}
        {cart.length >= 1 && (
          <div className="mt-6 space-y-4 border-t border-slate-200/60 pt-6 dark:border-slate-700/60">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Total Amount:
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
                ${usingMemoItem.toFixed(2)}
              </span>
            </div>

            <button className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
              <span className="relative z-10 flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                  />
                </svg>
                Proceed to Checkout
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>
        )}

        {/* Empty Cart State */}
        {cart.length < 1 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 p-6 dark:from-slate-700 dark:to-slate-800">
              <svg
                className="h-12 w-12 text-slate-400 dark:text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
              Your cart is empty
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add some products to get started
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
