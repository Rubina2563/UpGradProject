import React, { useEffect } from "react";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assets/Animations/success.json";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/actions/cart"; // Adjust path as needed

const OrderSuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart on order success
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;