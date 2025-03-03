// app/products/store/useCart.ts

import { create } from "zustand";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number; // ✅ Ensure quantity is included
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
};

export const useCart = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      } else {
        return { cart: [...state.cart, item] };
      }
    }),
}));