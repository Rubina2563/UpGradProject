import React from "react";
import { Link } from "react-router-dom";
import ShoppingBanner from "../../../Static/shopping_banner.jpg";

const Hero = () => {
  return (
    <div
      className="relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${ShoppingBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[90%] 800px:w-[60%] mx-auto flex flex-col items-center justify-center text-center">
  <h1 className="text-[35px] leading-[1.2] md:text-[60px] text-yellow-900 font-[600] capitalize">
    Shop Smarter, <br /> Shop Better with ShopPlusPlus!
  </h1>
  <p className="pt-5 md:text-[20px] lg:text-[23px] font-[Poppins] sm:font-[400] md:font-[500] text-white">
    ShopPlusPlus is your one-stop destination for all your shopping needs. <br />
    Explore a wide range of products from top brands, all at unbeatable prices.{" "}
    <br />Enjoy a seamless shopping experience with our user-friendly interface, secure payment options, and fast shipping.
  </p>
  <Link to="/products" className="inline-block">
    <div className="my-3 flex h-[50px] w-[150px] items-center justify-center rounded-xl bg-black cursor-pointer mt-5">
      <span className="text-[#fff] font-[Poppins] text-[18px]">
        Shop Now
      </span>
    </div>
  </Link>
</div>
    </div>
  );
};

export default Hero;