import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: [], // Ensure it's an array
  loading: true,
  error: null,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("AddToCartRequest", (state) => {
      state.loading = true;
    })
    .addCase("AddToCartSuccess", (state, action) => {
      state.loading = false;
      const item = action.payload;
      state.cart.push(item);
    })
    .addCase("AddToCartFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("RemoveFromCartRequest", (state) => {
      state.loading = true;
    })
    .addCase("RemoveFromCartSuccess", (state, action) => {
      state.loading = false;
      state.cart = state.cart.filter((i) => i.product._id !== action.payload);
    })
    .addCase("RemoveFromCartFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchCartItemsRequest", (state) => {
      state.loading = true;
    })
    .addCase("fetchCartItemsSuccess", (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    })
    .addCase("fetchCartItemsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("IncreaseQuantityRequest", (state) => {
      state.loading = true;
    })
    .addCase("IncreaseQuantitySuccess", (state, action) => {
      state.loading = false;
      const updatedCart = state.cart.map((item) => {
        if (item.product._id === action.payload.product._id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      state.cart = updatedCart;
    })
    .addCase("IncreaseQuantityFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("DecreaseQuantityRequest", (state) => {
      state.loading = true;
    })
    .addCase("DecreaseQuantitySuccess", (state, action) => {
      state.loading = false;
      const updatedCart = state.cart.map((item) => {
        if (item.product._id === action.payload.product._id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      state.cart = updatedCart;
    })
    .addCase("DecreaseQuantityFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("ClearCartRequest", (state) => {
      state.loading = true;
    })
    .addCase("ClearCartSuccess", (state) => {
      state.loading = false;
      state.cart = [];
    })
    .addCase("ClearCartFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
