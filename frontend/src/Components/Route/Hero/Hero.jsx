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
      <div className="w-[90%] 800px:w-[60%] mx-auto">
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-black font-[600] capitalize">
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] sm:font-[500] md:font-[800] text-orange-950">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
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