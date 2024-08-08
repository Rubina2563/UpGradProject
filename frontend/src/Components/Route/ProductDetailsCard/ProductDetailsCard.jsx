import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { addToCart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
console.log("data outside",data)
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };


  const addToCartHandler = async (data) => {
  console.log("from ProductDetails", data);
  
  if (data.stock < count) {
    enqueueSnackbar("Product stock limited", { variant: 'error' });
  } else {
    const cartData = { ...data, quantity: count };
    
    try {
      const dispatchedData = await dispatch(addToCart(cartData)); // This should now hold the response data
      console.log("dispatched", dispatchedData);
      enqueueSnackbar("Item added to cart", { variant: 'success' });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: 'info' });
      } else {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  }
};
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full md:flex">
              <div className="w-full md:w-[50%]">
                <img src={`${data.images && data.images[0]?.url}`} alt="" />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${data.images && data.images[0]?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`pt-3 text-[15px] text-blue-400 pb-3`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">{data?.ratings} Ratings</h5>
                    </div>
                  </Link>
                </div>

               
              </div>

              <div className="w-full md:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`font-[600] font-Roboto text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`font-bold text-[18px] text-[#333] font-Roboto`}>
                    {data.discountPrice} Rs
                  </h4>
                  <h3 className={`font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through`}>
                    {data.originalPrice ? data.originalPrice + " Rs" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                 
                </div>
                <div
                  className={`w-[150px] bg-black my-3 justify-center cursor-pointer mt-6 rounded-[4px] h-11 flex items-center ${
                    data.stock < 1 || !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => {
                    if (data.stock > 0 && isAuthenticated) addToCartHandler(data);
                  }}
                  title={data.stock < 1 ? "Out of stock" : isAuthenticated ? "Add to cart" : "Login please"}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;