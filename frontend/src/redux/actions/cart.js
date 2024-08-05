import axios from "axios";
import { server } from "../../server";

// Add to cart
export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: "AddToCartRequest" });

      const { data } = await axios.post(
        `${server}/cart/add`,
        {
          productId,
          quantity,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "AddToCartSuccess",
        payload: data,
      });

      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
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
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "RemoveFromCartSuccess",
      payload: productId,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
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
    console.log(data)

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

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
