import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
// import { Link } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";

// import { addTocart } from "../../../redux/actions/cart";
// import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  // const { cart } = useSelector((state) => state.cart);
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
 // const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decreasing = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increasing = () => {
    setCount(count + 1);
  };

  /*

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  */

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
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[0].url}
                  alt=""
                  className="w-full h-auto"
                />
                <div className="flex">
                  {/* <Link to={`/shop/preview/${data.shop._id}`} className="flex"> */}
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">{data.shop.ratings} Ratings</h5>
                  </div>
                  {/* </Link> */}
                </div>
                <div
                  className="bg-black w-1/2 mt-4 rounded-[4px] h-11 flex items-center justify-center cursor-pointer"
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1 " />
                  </span>
                </div>
                <h5 className="text-[16px] text-red-600 mt-5">{data.total_sell} Sold out</h5>
              </div>

              <div className="w-full md:w-[50%] pt-5 pl-2 pr-2">
                <h1 className="text-[20px] font-semibold text-gray-800">
                  {data.name}
                </h1>
                <p className="text-gray-600">{data.description}</p>

                <div className="flex pt-3">
                  <h4 className="text-lg font-bold text-red-500">
                    {data.discount_price}$
                  </h4>
                  {data.price && (
                    <h3 className="text-sm line-through text-gray-500 ml-2">
                      {data.price}$
                    </h3>
                  )}
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decreasing}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={increasing}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)} // removeFromWishlistHandler(data)
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)} // addToWishlistHandler(data)
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className="bg-black mt-6 rounded-[4px] h-11 flex items-center justify-center cursor-pointer"
                 /* onClick={() => addToCartHandler(data._id)}*/
                >
                  <span className="text-white flex items-center">
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