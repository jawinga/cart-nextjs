import CartItem from "./CartItem";
import { CartItemProps } from "../reducers/ReducerCart";

interface CartItemListProps {
  cart: CartItemProps[];
  removeItem: (item: CartItemProps) => void;
}

const Cart = ({ cart, removeItem }: CartItemListProps) => {
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
            ></CartItem>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold text-gray-800 dark:text-white">
          Total: $79.98
        </p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
