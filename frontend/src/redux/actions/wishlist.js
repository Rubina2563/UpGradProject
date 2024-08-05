import axios from "axios";
import { server } from "../../server";




export const addToWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "AddToWishlistRequest" });
    const { data } = await axios.post(
      `${server}/wishlist/add`,
      { productId },
      { withCredentials: true }
    );
    dispatch({ type: "AddToWishlistSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "AddToWishlistFail",
      payload: error.response.data.message,
    });
  }
};

export const fetchWishlist = (userId) => async (dispatch) => {
 
  try {
    dispatch({ type: "FetchWishlistRequest" });
    const { data } = await axios.get(`${server}/wishlist?userId=${userId}`, {
      withCredentials: true,
    });
    dispatch({ type: "FetchWishlistSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "FetchWishlistFail",
      payload: error.response.data.message,
    });
  }
};

export const removeFromWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "RemoveFromWishlistRequest" });
    await axios.post(
      `${server}/wishlist/remove`,
      { productId },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "RemoveFromWishlistSuccess", payload: productId });
  } catch (error) {
    dispatch({
      type: "RemoveFromWishlistFail",
      payload: error.response.data.message,
    });
  }
};
