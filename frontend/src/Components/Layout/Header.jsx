import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categoriesData,productData } from "../../Static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./Dropdown";
import Navbar from "./Navbar";

//import { useSelector } from "react-redux";
//import Cart from "../cart/Cart";
//import Wishlist from "../Wishlist/Wishlist";
//import { RxCross1 } from "react-icons/rx";

const Header = ({ heading }) => {
  //const { isAuthenticated, user } = useSelector((state) => state.user);
  //const { isSeller } = useSelector((state) => state.seller);
 // const { wishlist } = useSelector((state) => state.wishlist);
 // const { cart } = useSelector((state) => state.cart);
  //const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
 // const [openCart, setOpenCart] = useState(false);
//  const [openWishlist, setOpenWishlist] = useState(false);
  //const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
      <>
      {/* First header line */}
      <div className="w-full bg-blue-500">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[70px]">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
                className="h-[50px]"
              />
            </Link>
          </div>

          {/* Search box */}
          <div className="flex-grow relative mx-4">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i, index) => {
                  const d = i.name;
                  const Product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product_name}`} key={index}>
                      <div className="w-full flex items-start py-3">
                        <img
                          src={i.image_Url[0].url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Become a Seller */}
          <div className="w-[170px] h-[50px] bg-blue-700 rounded-[5px] flex items-center justify-center">
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
          {/*second header line*/}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className="w-full mx-auto max-w-[1200px] relative flex items-center justify-between">
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md"
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
              ):null}
            </div>
                  </div>
                  
          {/* navitems */}
          <div className="flex items-center">
            <Navbar active={heading} />
          </div>

               {/*only icon*/}   
                  <div className="flex">
                      {/*wishlist icon setting*/}
                      <div className="flex items-center">
              <div
                className="relative cursor-pointer mr-[15px]"
               // onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
                      </div>
                      {/*shoppingcart icon setting*/}

                       <div className="flex items-center">
              <div
                className="relative cursor-pointer mr-[15px]"
                //onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {/*cart && cart.length*/}
                </span>
              </div>
                         </div>
                      {/*User login icon setting*/}
                       <div className="flex items-center">
                          <div className="relative cursor-pointer mr-[15px]">
                               <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                {/*isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt="User Avatar"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )*/}
              </div>
                          </div>

               

       
                  </div>
        </div>
      </div>

     
    </>
  );
};

export default Header;