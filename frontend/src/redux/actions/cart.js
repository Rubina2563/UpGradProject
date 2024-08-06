import axios from "axios";
import { server } from "../../server";

// Add to cart
export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: "AddToCartRequest" });

      const { data } = await axios.post(
        `${server}/cart/add`,
        { productId, quantity },
        { withCredentials: true }
      );

      dispatch({
        type: "AddToCartSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "AddToCartFail",
        payload: error.response.data.message,
      });
    }
  };

// Remove from cart
export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "RemoveFromCartRequest" });

    await axios.post(
      `${server}/cart/remove`,
      { productId },
      { withCredentials: true }
    );

    dispatch({
      type: "RemoveFromCartSuccess",
      payload: productId,
    });
  } catch (error) {
    dispatch({
      type: "RemoveFromCartFail",
      payload: error.response.data.message,
    });
  }
};

// Fetch cart items
export const fetchCartItems = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "fetchCartItemsRequest" });

    const { data } = await axios.get(`${server}/cart?userId=${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "fetchCartItemsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "fetchCartItemsFail",
      payload: error.response.data.message,
    });
  }
};

// Increase quantity
export const increaseQuantity = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IncreaseQuantityRequest" });

    const { data } = await axios.post(
      `${server}/cart/increase-quantity`,
      { productId },
      { withCredentials: true }
    );
console.log("increasing",data)
    dispatch({
      type: "IncreaseQuantitySuccess",
      payload: data.cart,
    });
  } catch (error) {
    dispatch({
      type: "IncreaseQuantityFail",
      payload: error.response.data.message,
    });
  }
};

// Decrease quantity
export const decreaseQuantity = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DecreaseQuantityRequest" });

    const { data } = await axios.post(
      `${server}/cart/decrease-quantity`,
      { productId },
      { withCredentials: true }
    );

    dispatch({
      type: "DecreaseQuantitySuccess",
      payload: data.cart,
    });
  } catch (error) {
    dispatch({
      type: "DecreaseQuantityFail",
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
