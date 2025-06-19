// /store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item } from '../types/item';

type CartState = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.find((i) => i._id === item._id)) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i._id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-store' }
  )
);
