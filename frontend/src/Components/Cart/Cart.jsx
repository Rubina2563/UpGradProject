import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, fetchCartItems, increaseQuantity, decreaseQuantity } from "../../redux/actions/cart";
import { useSnackbar } from 'notistack';

const Cart = ({ setOpenCart }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      setLoading(true);
      dispatch(fetchCartItems(user._id))
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          enqueueSnackbar('Error fetching cart items. Please try again later.', { variant: 'error' });
          setLoading(false);
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const calculatedTotal = cart.reduce(
        (acc, item) => (item.quantity && item.product.discountPrice
          ? acc + item.quantity * item.product.discountPrice
          : acc),
        0
      );
      setTotalPrice(calculatedTotal);
    }
  }, [cart]);

  const handleAPIError = (error) => {
    console.error(error);
    enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
    setLoading(false);
  };

  const removeFromCartHandler = async (productId) => {
    setLoading(true);
    try {
      await dispatch(removeFromCart(productId));
      await dispatch(fetchCartItems(user._id));
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantityHandler = async (productId, currentQuantity, stock) => {
    if (currentQuantity >= stock) {
      enqueueSnackbar('Quantity exceeds available stock.', { variant: 'error' });
      return;
    }
    setLoading(true);
    try {
      await dispatch(increaseQuantity(productId));
      await dispatch(fetchCartItems(user._id));
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantityHandler = async (productId, currentQuantity) => {
    if (currentQuantity <= 1) return;
    setLoading(true);
    try {
      await dispatch(decreaseQuantity(productId));
      await dispatch(fetchCartItems(user._id));
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] md:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <h5>Loading...</h5>
          </div>
        ) : cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items are empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`flex items-center p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart.length} items
                </h5>
              </div>

              {/* Cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart.map((item, index) => (
                  <CartSingle
                    key={index}
                    data={item}
                    increaseQuantityHandler={increaseQuantityHandler}
                    decreaseQuantityHandler={decreaseQuantityHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* Checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (Rs {totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, increaseQuantityHandler, decreaseQuantityHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.quantity);

  useEffect(() => {
    setValue(data.quantity);
  }, [data.quantity]);

  if (!data || !data.product) {
    return null;
  }

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer`}
            onClick={() => increaseQuantityHandler(data.product._id, value, data.product.stock)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decreaseQuantityHandler(data.product._id, value)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={data.product.images[0]?.url || ''}
          alt={data.product.name}
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.product.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            Rs {data.product.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            Rs {data.product.discountPrice * value}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data.product._id)}
        />
      </div>
    </div>
  );
};

export default Cart;