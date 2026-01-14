import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.tsx";
import cartReducer from "./features/cartSlice";
import uiReducer from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
