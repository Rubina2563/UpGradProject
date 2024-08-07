import React, { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, fetchWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { useSnackbar } from 'notistack';

const Wishlist = ({ setOpenWishlist }) => {
  const dispatch = useDispatch();
  const { wishlist, isLoading } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist(user._id));
    }
  }, [dispatch, user]);

  

  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((item) => item._id === data._id);
    if (isItemExists) {
      enqueueSnackbar("Item already in cart!", { variant: 'error' });
    } else {
      if (data.stock < 1) {
        enqueueSnackbar("Product out of stock", { variant: 'error' });
      } else {
        const newData = { ...data, qty: 1 };
        dispatch(addToCart(newData));
        setOpenWishlist(false);
        enqueueSnackbar("Item added to cart successfully!", { variant: 'success' });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll md:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <h5>Loading...</h5>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <div className={`flex items-center p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist.length} items
                </h5>
              </div>
              <div className="w-full border-t">
                {wishlist.map((item) => (
                  <CartSingle
                    key={item._id}
                    data={item}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const totalPrice = data.discountPrice;
console.log("data",data)
  return (
    <div className="border-b p-4">
      <div className="w-full md:flex items-center">
        <RxCross1
          className="cursor-pointer md:mb-['unset'] md:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data._id)}
        />
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[15px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 md:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            Rs {totalPrice}
          </h4>
        </div>
        <div className="pl-[15px]">
          <BsCartPlus
            size={20}
            className={`cursor-pointer ${data.stock < 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={data.stock < 1 ? "Out of stock" : "Add to cart"}
            onClick={() => {
              if (data.stock > 0) addToCartHandler(data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;