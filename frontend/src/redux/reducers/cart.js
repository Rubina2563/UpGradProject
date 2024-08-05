import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCartRequest", (state) => {
      state.loading = true;
    })
    .addCase("addToCartSuccess", (state, action) => {
      state.loading = false;
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
    })
    .addCase("addToCartFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("removeFromCartRequest", (state) => {
      state.loading = true;
    })
    .addCase("removeFromCartSuccess", (state, action) => {
      state.loading = false;
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    })
    .addCase("removeFromCartFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
