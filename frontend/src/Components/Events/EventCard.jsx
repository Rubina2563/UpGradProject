import React from "react";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { useSnackbar } from 'notistack';

const EventCard = ({ active, data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!data) {
    return null; // Return null if data is not available
  }

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      enqueueSnackbar("Item already in cart!", { variant: 'error' });
    } else {
      if (data.stock < 1) {
       enqueueSnackbar("Product stock limited", { variant: 'error' });
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        enqueueSnackbar("Item added to cart successfully!", { variant: 'success' });
      }
    }
  };

  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img src={`${data.images[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className="text-[25px] font-[600] font-Roboto text-[#333]">{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice} Rs
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice} Rs
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[#fff]">See Details</div>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default EventCard;