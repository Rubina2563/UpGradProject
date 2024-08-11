import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useSnackbar } from 'notistack';
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
    const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
         // Extracting the success message from the response
    const successMessage = res.data?.message || "Operation successful";

    // Using enqueueSnackbar to show the success message
    enqueueSnackbar(successMessage, { variant: 'success' });
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };


  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
   <div className="relative flex items-center cursor-pointer w-full mb-8 group" onClick={() => setActive(2)}>
  <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
  <span
    className="absolute left-5 bottom-1 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    Orders
  </span>
      </div>
      
      <div className="relative flex items-center cursor-pointer w-full mb-8 group" onClick={() => setActive(3)}>
  <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
  <span
    className="absolute left-5 bottom-1 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    Remaining refunds
  </span>
</div>

     

    <div className="relative flex items-center cursor-pointer w-full mb-8 group" onClick={() => setActive(5)}>
  <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
  <span
    className="absolute left-5 bottom-1 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    Track Order
  </span>
</div>

    <div className="relative flex items-center cursor-pointer w-full mb-8 group" onClick={() => setActive(6)}>
  <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
  <span
    className="absolute left-5 bottom-1 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    Change Password
  </span>
</div>
     <div className="relative flex items-center cursor-pointer w-full mb-8 group" onClick={() => setActive(7)}>
  <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
  <span
    className="absolute left-5 bottom-1 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    Address
  </span>
</div>

   
      
  <div
  className="relative flex items-center cursor-pointer w-full mb-8 group"
  onClick={logoutHandler}
>
  <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
  <span
    className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block hidden`}
  >
    Log out
  </span>
  <span
    className="absolute left-5 bottom-1 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    Log out
  </span>
</div>
    </div>
  );
};

export default ProfileSidebar;