//corrected
import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import shopPlusPlusImage from '../../../Static/ShopPlusPlus.svg';

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
       <div>
          <img
             style={{ width: '160px', height: '36px' }}
            src={shopPlusPlusImage}
            alt=""
        />
        <h2 className="font-bold text-3xl text-red-500">
  ShopPlusPlus
</h2>
        </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          
          <Link to="/dashboard-coupouns" className="md:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
         
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;