"use client";
import type { CartItemProps } from "../reducers/ReducerCart";

interface ProductProps {
  item: CartItemProps;
  removeItem: (item: CartItemProps) => void;
  totalPrice: number;
  setTotalPrice: (price: number, actionButton: string) => void;
  incrementQuantity: (item: CartItemProps) => void;
  decreaseQuantity: (item: CartItemProps) => void;
}

const CartItem = ({
  item,
  removeItem,
  setTotalPrice,
  incrementQuantity,
  decreaseQuantity,
}: ProductProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 dark:border-slate-700/60 dark:bg-slate-800/50 dark:hover:shadow-slate-900/20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/10 dark:to-purple-900/10" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Product Image */}
        <div className="shrink-0 sm:order-1">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-3 dark:from-slate-700 dark:to-slate-800">
            <img
              className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105"
              src={item.image || "/placeholder.svg"}
              alt="product image"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full min-w-0 flex-1 sm:order-2 sm:max-w-md">
          <a
            href="#"
            className="block text-base font-semibold text-slate-900 transition-colors duration-200 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            {item.title}
          </a>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="group/btn inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-pink-50 hover:text-pink-600 dark:text-slate-400 dark:hover:bg-pink-900/20 dark:hover:text-pink-400"
            >
              <svg
                className="mr-2 h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              Add to Favorites
            </button>

            <button
              type="button"
              className="group/btn inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
              onClick={() => {
                removeItem(item);
                setTotalPrice(item.price, "remove");
              }}
            >
              <svg
                className="mr-2 h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="flex items-center justify-between sm:order-3 sm:flex-col sm:items-end sm:justify-between">
          {/* Price */}
          <div className="text-end">
            <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
              ${item.price}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center rounded-xl bg-slate-50 p-1 dark:bg-slate-700/50">
            {item.quantity > 1 && (
              <button
                type="button"
                id="decrement-button"
                onClick={() => decreaseQuantity(item)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
            )}

            <input
              type="text"
              id="counter-input"
              className="w-12 border-0 bg-transparent text-center text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0 dark:text-white"
              value={item.quantity}
              readOnly
            />

            <button
              type="button"
              id="increment-button"
              onClick={() => incrementQuantity(item)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
