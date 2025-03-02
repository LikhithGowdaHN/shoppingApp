import { create } from "zustand";

interface CartState {
  cart: { id: number; title: string; price: number }[];
  addToCart: (item: { id: number; title: string; price: number }) => void;
}

export const useCart = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
}));