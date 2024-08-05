import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  isLoading: false,
  error: null,
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("FetchWishlistRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("FetchWishlistSuccess", (state, action) => {
      state.isLoading = false;
      state.wishlist = action.payload;
    })
    .addCase("FetchWishlistFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("AddToWishlistRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("AddToWishlistSuccess", (state, action) => {
      state.isLoading = false;
      state.wishlist.push(action.payload);
    })
    .addCase("AddToWishlistFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("RemoveFromWishlistRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("RemoveFromWishlistSuccess", (state, action) => {
      state.isLoading = false;
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
    })
    .addCase("RemoveFromWishlistFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default wishlistReducer;
