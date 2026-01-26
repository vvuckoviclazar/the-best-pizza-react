import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type Pizza = {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: string[];
  unitPrice: number;
  soldOut: boolean;
};

export type CartItem = {
  pizza: Pizza;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Pizza>) {
      const pizza = action.payload;
      const existing = state.items.find((item) => item.pizza.id === pizza.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ pizza, quantity: 1 });
      }
    },

    increaseItemQuantity(state, action: PayloadAction<number>) {
      const pizzaId = action.payload;
      const existing = state.items.find((item) => item.pizza.id === pizzaId);
      if (existing) {
        existing.quantity += 1;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const pizzaId = action.payload;
      const existing = state.items.find((item) => item.pizza.id === pizzaId);
      if (!existing) return;

      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.pizza.id !== pizzaId);
      }
    },

    deleteItem(state, action: PayloadAction<number>) {
      const pizzaId = action.payload;
      state.items = state.items.filter((item) => item.pizza.id !== pizzaId);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartPrice = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.pizza.unitPrice * item.quantity,
    0
  );
