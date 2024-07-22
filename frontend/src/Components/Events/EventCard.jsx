import React from "react";
import CountDown from "./CountDown.jsx";
//import { Link } from "react-router-dom";
import One from "../../Static/one.jpg";
//import { useDispatch, useSelector } from "react-redux";
//import { addTocart } from "../../redux/actions/cart";

const EventCard = () => {
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
   <div className="w-3/5 block bg-white rounded-lg p-2 lg:flex ">
 <div className="w-full lg:w-[50%] m-auto relative overflow-hidden">
  <img src={One} alt="Event" className="w-[95%] h-[95%] object-cover m-auto" />
</div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className="text-lg font-bold">I phone max</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, sint deleniti voluptatum fugit error eius repudiandae assumenda qui voluptas ipsum quaerat adipisci sit consectetur ipsam sunt non molestias ea praesentium?</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-medium text-lg text-red-600 pr-3 line-through">
              1099 Rs
            </h5>
            <h5 className="font-bold text-xl text-gray-800 font-Roboto">
              {/*data.discountPrice*/}999 Rs
            </h5>
          </div>
          <span className="pr-3 font-medium text-lg text-green-600">
            {/*data.sold_out*/} 120 sold
          </span>
        </div>
        <CountDown />
        <br />
       
        {/* <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className="my-3 flex h-12 w-36 items-center justify-center rounded-xl bg-black cursor-pointer text-white">
              See Details
            </div>
          </Link>
          <div
            className="my-3 flex h-12 w-36 items-center justify-center rounded-xl bg-black cursor-pointer text-white ml-5"
           // onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default EventCard;