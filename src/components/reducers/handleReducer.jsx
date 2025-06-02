export const DESCREMENT = "descrement";
export const INCREMENT = "increment";
export const REMOVE_ITEM = "remove";
export const ADD_TO_CART = "addtocart";
function reducerCounter(state, action) {
  const { type, payload } = action;
  console.log(action);
  switch (type) {
    case ADD_TO_CART: {
      // Check if the product already exists in the cart
      const existingItemIndex = state.cart?.findIndex(
        (item) => item.id === payload.id
      );

      if (existingItemIndex >= 0) {
        // If item exists, increase its quantity
        const updatedCart = state.cart.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        // Calculate new total
        const newTotal = updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          ...state,
          cart: updatedCart,
          total: newTotal,
        };
      } else {
        // If item doesn't exist, add it with quantity 1
        const newItem = { ...payload, quantity: 1 };
        const updatedCart = state.cart ? [...state.cart, newItem] : [newItem];

        // Calculate new total
        const newTotal = updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          ...state,
          cart: updatedCart,
          total: newTotal,
        };
      }
    }

    case INCREMENT: {
      // Increase quantity of the item with the given ID
      const updatedCart = state.cart.map((item) => {
        if (item.id === payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      // Calculate new total
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cart: updatedCart,
        total: newTotal,
      };
    }

    case DESCREMENT: {
      // Find the item to decrease
      const item = state.cart.find((item) => item.id === payload);

      if (!item) return state;

      let updatedCart;

      // If quantity becomes 0, remove the item
      if (item.quantity === 1) {
        updatedCart = state.cart.filter((item) => item.id !== payload);
      } else {
        // Otherwise decrease quantity by 1
        updatedCart = state.cart.map((item) => {
          if (item.id === payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }

      // Calculate new total
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cart: updatedCart,
        total: newTotal,
      };
    }

    case REMOVE_ITEM: {
      // Remove the item with the given ID
      const updatedCart = state.cart.filter((item) => item.id !== payload);

      // Calculate new total
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cart: updatedCart,
        total: newTotal,
      };
    }

    default:
      return state;
  }
}
export default reducerCounter;
