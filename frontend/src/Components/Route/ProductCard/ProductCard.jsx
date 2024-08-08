import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { addToCart, removeFromCart } from "../../../redux/actions/cart";
import { useSnackbar } from 'notistack';
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
 

  console.log("cart",cart)
  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item._id === data._id));
  }, [wishlist, data._id]);

 useEffect(() => {
  try {
    setIsInCart(cart.some((item) => item?.product._id === data._id));
  } catch (error) {
    // If an error occurs, assume it's because the cart is empty and it's the first item being added
    console.error("Error in useEffect:", error);
    setIsInCart(false); // Set to false initially
    enqueueSnackbar("Added to your cart successfully!", { variant: 'success' }); // Show the message
  }
}, [cart, data._id]);

  const addToWishlistHandler = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(data._id));
      setIsInWishlist(true);
      enqueueSnackbar("Added to wishlist", { variant: 'success' });
    } else {
      enqueueSnackbar("Please log in to add to wishlist", { variant: 'warning' });
    }
  };

  const removeFromWishlistHandler = () => {
    if (isAuthenticated) {
      dispatch(removeFromWishlist(data._id));
      setIsInWishlist(false);
      enqueueSnackbar("Removed from wishlist", { variant: 'success' });
    } else {
      enqueueSnackbar("Please log in to remove from wishlist", { variant: 'warning' });
    }
  };

  const handleCartToggle = () => {
    if (isAuthenticated) {
      if (isInCart) {
        enqueueSnackbar("Item already in the cart", { variant: 'info' }); // Display a message if already in cart
      } else {
        if (data.stock < 1) {
          enqueueSnackbar("Product out of stock", { variant: 'error' });
        } else {
          dispatch(addToCart({ ...data, quantity: 1 }));
          setIsInCart(true);
          enqueueSnackbar("Item added to cart successfully!", { variant: 'success' });
        }
      }
    } else {
      enqueueSnackbar("Please log in to add/remove from cart", { variant: 'warning' });
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={data.images && data.images[0]?.url}
            alt={data.name}
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">{data.shop.name}</h5>
        </Link>
        <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
                {data.originalPrice === 0 ? data.originalPrice : data.discountPrice} Rs
              </h5>
              <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                {data.originalPrice ? data.originalPrice + " Rs" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* Side options */}
        <div>
          {isAuthenticated ? (
            isInWishlist ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={removeFromWishlistHandler}
                color="red"
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={addToWishlistHandler}
                color="#333"
                title="Add to wishlist"
              />
            )
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-not-allowed absolute right-2 top-5"
              color="#333"
              title="Login required"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          {isAuthenticated ? (
            <button
              onClick={handleCartToggle}
              disabled={data.stock < 1}
              className={`cursor-pointer absolute right-2 top-24 ${data.stock < 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={data.stock < 1 ? "Out of stock" : "Add to cart"}
            >
              <AiOutlineShoppingCart size={25} color="#444" />
            </button>
          ) : (
            <button
              className="cursor-not-allowed absolute right-2 top-24"
              title="Login required"
            >
              <AiOutlineShoppingCart size={25} color="#444" />
            </button>
          )}
          {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
        </div>
      </div>
    </>
  );
};

export default ProductCard;