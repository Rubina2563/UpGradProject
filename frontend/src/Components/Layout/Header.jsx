import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../Static/data";
import shopPlusPlusImage from '../../Static/ShopPlusPlus.svg';
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
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
//import Cart from "../cart/Cart";
//import Wishlist from "../Wishlist/Wishlist";
//import { RxCross1 } from "react-icons/rx";

const Header = ({ heading }) => {
  const { isAuthenticated, user} = useSelector((state) => state.user);
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
  console.log(user);
  
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
        <div className="w-full mx-auto flex items-center justify-between h-[70px]">
          <div className="flex items-center sm:w-40 md:w-1/5">
            <Link to="/">
              <img
                src={shopPlusPlusImage}
                alt="Logo"
                className="h-[50px] w-10"
              />
                      </Link>
  <h1 className=" font-extrabold text-blue-800 sm:text-1xl lg:text-2xl  text-center bg-gray-100 p-4 shadow-lg rounded-lg">
  ShopPlusPlus
</h1>
          </div>

          {/* Search box */}
          <div className="flex-grow relative mx-4">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] sm:w-full lg:w-1/2  px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute sm:w-6 sm:right-2 lg:right-1/2 top-1.5 cursor-pointer"
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
                Shopkepper ?
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
  } transition w-full bg-[#3321c8] sm:h-[100px] md:h-[70px] flex items-center justify-between`}
>
 
    {/* categories */}
    <div className=" m-3 relative flex items-center justify-center">
      <BiMenuAltLeft size={30} className="absolute left-0" />
      <button
        onClick={() => setDropDown(!dropDown)}
        className="flex items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md h-[60px] mt-[10px]"
      >
        All Categories
        <IoIosArrowDown size={20} className="ml-2 cursor-pointer" />
      </button>
      {dropDown && (
        <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
      )}
    </div>

    {/* navitems */}
    <div className="flex-grow flex items-center justify-center">
      <Navbar active={heading} />
    </div>

    {/* icons */}
    <div className="p-10 flex items-center space-x-4">
      {/* wishlist icon setting */}
      <div className="relative cursor-pointer">
        {/* onClick={() => setOpenWishlist(true)} */}
        <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
          0
        </span>
      </div>

      {/* shopping cart icon setting */}
      <div className="relative cursor-pointer">
        {/* onClick={() => setOpenCart(true)} */}
        <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
          {/* cart && cart.length */}
        </span>
      </div>

      {/* user login icon setting */}
      <div className="relative cursor-pointer">
        <Link to="/login">
         
        </Link>
            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={`${backend_url}${user.avatar.url}`}
                  className="w-[35px] h-[35px] rounded-full"
                  alt="User Avatar"
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
              </Link>
            )}
      </div>
    </div>
  </div>

     
    </>
  );
};

export default Header;