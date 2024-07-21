import React, { useState } from "react";
import {
  AiFillHeart,
  // AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  // AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
// import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
// import { useEffect } from "react";
// import { addTocart } from "../../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "../../Products/Ratings";

const ProductCard = ({ data }) => {
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();

  /* useEffect(() => {
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

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };*/
  
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_name}`}>
          <img
            src={data.image_Url[0].url}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className="text-sm font-medium text-gray-700">{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-medium text-gray-800">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          {/* paste here rating component */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className="text-lg font-bold text-red-500">
                {data.originalPrice === 0 ? data.price : data.discount_price}$
              </h5>
              {data.price && (
                <h4 className="text-sm line-through text-gray-500 ml-2">
                  {data.price}$
                </h4>
              )}
            </div>
            <span className="font-medium text-green-500 text-lg">
              {data?.total_sell} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)} // removeFromWishlistHandler(data)
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)} // addToWishlistHandler(data)
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => setOpen(!open)} // addToCartHandler(data._id)
            color="#444"
            title="Add to cart"
          />
          { open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null }
        </div>
      </div>
    </>
  );
};

export default ProductCard;