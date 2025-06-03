export interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItemProps }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "ADD_QUANTITY"; payload: CartItemProps }
  | { type: "REMOVE_QUANTITY"; payload: CartItemProps };

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

    case "ADD_QUANTITY":
      const foundItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!foundItem) return state;

      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        cart: updatedCart,
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + foundItem.price,
      };

    case "REMOVE_QUANTITY": {
      const itemToUpdate = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToUpdate || itemToUpdate.quantity <= 1) return state;

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        totalQuantity: state.totalQuantity - 1,
        totalPrice: state.totalPrice - itemToUpdate.price,
      };
    }

    default:
      return state;
  }
}
