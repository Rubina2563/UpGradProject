import React from "react";

import CountDown from "./CountDown";
import { Link } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
//import { addTocart } from "../../redux/actions/cart";


const EventCard = ({ active, data }) => {
  //const { cart } = useSelector((state) => state.cart);
  //const dispatch = useDispatch();

  /*const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
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
  }*/
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img src={`${data.images[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>I phone max</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, sint deleniti voluptatum fugit error eius repudiandae assumenda qui voluptas ipsum quaerat adipisci sit consectetur ipsam sunt non molestias ea praesentium?</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099 Rs
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {/*data.discountPrice*/}999 Rs
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {/*data.sold_out*/} 120 sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;