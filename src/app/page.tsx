"use client";
import React, { useReducer } from "react";
import ProductList from "./components/ProductList";
import { initialState } from "./reducers/ReducerCart";
import { reducer } from "./reducers/ReducerCart";
import Cart from "./components/Cart";
import { CartItemProps } from "./reducers/ReducerCart";

export default function Home() {
  const [totalPrice, setTotalPrice] = React.useState(0);

  function handleTotalPrice(price: number, actionButton: string) {
    switch (actionButton) {
      case "add":
        setTotalPrice((prev) => (prev += price));
        break;
      case "remove":
        setTotalPrice((prev) => (prev -= price));
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item: CartItemProps) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (item: CartItemProps) => {
    dispatch({ type: "REMOVE_ITEM", payload: item.id });
  };

  const increaseQuant = (item: CartItemProps) => {
    dispatch({ type: "ADD_QUANTITY", payload: item });
  };

  const decreaseQuant = (item: CartItemProps) => {
    dispatch({ type: "REMOVE_QUANTITY", payload: item });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Enhanced Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-slate-300">
                MyShop
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a
                  href="#"
                  className="relative font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                </a>
                <a
                  href="#"
                  className="font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  About
                </a>
                <a
                  href="#"
                  className="font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-2 py-4 sm:px-4 lg:px-6">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400 sm:text-5xl">
            Welcome to MyShop
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Discover our amazing collection of premium products, carefully
            curated just for you.
          </p>
        </div>

        {/* Products and Cart Layout - Stacked on mobile, side-by-side on larger screens */}
        <div className="flex flex-col gap-8 xl:flex-row">
          {/* Products Section - Full width on mobile, 60% on desktop */}
          <div className="xl:w-3/5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Featured Products
              </h2>
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <span>Showing all products</span>
              </div>
            </div>
            <ProductList
              addItem={addItem}
              handleTotalPrice={handleTotalPrice}
              totalPrice={totalPrice}
            />
          </div>

          {/* Cart Section - Full width on mobile, 40% on desktop */}
          <div className="xl:w-2/5">
            <Cart
              cart={state.cart}
              removeItem={removeItem}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              decreaseQuantity={decreaseQuant}
              incrementQuantity={increaseQuant}
            />
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="mt-16 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; 2025 MyShop. All rights reserved. Made with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
