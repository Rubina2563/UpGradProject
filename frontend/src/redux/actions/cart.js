import axios from "axios";

// Add to cart
export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: "addToCartRequest" });

      const { data } = await axios.post("/api/v2/cart/add", {
        productId,
        quantity,
      });

      dispatch({
        type: "addToCartSuccess",
        payload: data,
      });

      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    } catch (error) {
      dispatch({
        type: "addToCartFail",
        payload: error.response.data.message,
      });
    }
  };

// Remove from cart
export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "removeFromCartRequest" });

    await axios.post("/api/v2/cart/remove", { productId });

    dispatch({
      type: "removeFromCartSuccess",
      payload: productId,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  } catch (error) {
    dispatch({
      type: "removeFromCartFail",
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
