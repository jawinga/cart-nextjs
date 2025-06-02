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

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔝 NAVBAR */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-sm">
        <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              MyShop
            </span>
          </a>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col md:flex-row md:space-x-8 text-sm font-medium mt-4 md:mt-0">
              <li>
                <a href="#" className="text-blue-700 dark:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 🔽 PAGE CONTENT AREA */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to MyShop</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Here youll find our amazing products.
        </p>

        {/* 🔲 Grid layout for the product list */}
        <div className="grid grid-cols-5 gap-3">
          <ProductList
            addItem={addItem}
            handleTotalPrice={handleTotalPrice}
            totalPrice={totalPrice}
          />
          <Cart
            cart={state.cart}
            removeItem={removeItem}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          ></Cart>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm text-gray-500">
        &copy; 2025 MyShop. All rights reserved.
      </footer>
    </div>
  );
}
