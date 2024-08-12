import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (product) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) =>
          item.id === product.id &&
          item.color_code === product.color_code &&
          item.size === product.size
      );

      let updatedCart;
      if (existingProductIndex > -1) {
        updatedCart = state.cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        updatedCart = [
          ...state.cart,
          { ...product, quantity: product.quantity || 1 },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  removeFromCart: (productID, colorCode, size) => {
    set((state) => {
      const updatedCart = state.cart.filter(
        (product) => {
          return (
            product.id !== productID ||
            product.color_code !== colorCode ||
            product.size !== size
          );
        }
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  clearCart: () => {
    set(() => {
      localStorage.removeItem("cart");
      return { cart: [] };
    });
  },

  getTotalQuantity: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + (item.quantity || 1), 0);
  },
}));