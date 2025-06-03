"use client";
import type { Product } from "../models/Product";
import type { CartItemProps } from "../reducers/ReducerCart";

interface ProductProps {
  product: Product;
  addItem: (item: CartItemProps) => void;
  totalPrice: number;
  handleTotalPrice: (item: number, actionButton: string) => void;
}

const SvgStarFill = () => {
  return (
    <svg
      className="w-4 h-4 text-amber-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
};

const SvgStarEmpty = () => {
  return (
    <svg
      className="w-4 h-4 text-slate-300 dark:text-slate-600"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
};

const CardProduct = ({ product, addItem, handleTotalPrice }: ProductProps) => {
  const stars = [];
  const rating = Math.floor(product.rating.rate);

  for (let index = 0; index < 5; index++) {
    if (index <= rating) {
      stars.push(<SvgStarFill key={index} />);
    } else {
      stars.push(<SvgStarEmpty key={index} />);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 dark:border-slate-700/60 dark:bg-slate-800/50 dark:hover:shadow-slate-900/20">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20 dark:to-purple-900/10" />

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-slate-700 dark:to-slate-800">
        <img
          className="mx-auto h-48 w-full object-contain transition-transform duration-500 group-hover:scale-110"
          src={product.image || "/placeholder.svg"}
          alt="product image"
        />

        {/* Floating badge */}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-300">
          New
        </div>
      </div>

      {/* Product Details */}
      <div className="relative p-6 space-y-4">
        <div>
          <h5 className="line-clamp-2 text-lg font-semibold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {product.title}
          </h5>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-1">{stars}</div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              {product.rating.rate}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({product.rating.count} reviews)
            </span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
              ${product.price}
            </span>
          </div>

          <button
            className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            onClick={() => {
              addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
              });
              handleTotalPrice(product.price, "add");
            }}
          >
            <span className="relative z-10 flex items-center">
              <svg
                className="mr-2 h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
