import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { server } from "../../server";
import ShopPlusPusLogo from "../../Static/ShopPlusPlus.svg";
import { categoriesData, productData } from "../../Static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineLogin
} from "react-icons/ai";
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { fetchWishlist } from "../../redux/actions/wishlist";
import { fetchCartItems } from "../../redux/actions/cart";

const Header = ({ heading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const searchRef = useRef();

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchWishlist(user._id));
      dispatch(fetchCartItems(user._id));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchData(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

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
    <>
      <div className={`w-11/12 mx-auto`}>
        <div className="hidden md:h-[50px] md:my-[20px] lg:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                style={{ width: '160px', height: '36px' }}
                src={ShopPlusPusLogo}
                alt=""
              />
            </Link>
            <h2 className="font-bold text-3xl text-red-500">
              ShopPlusPlus
            </h2>
          </div>

          {/* search box */}
          <div className="w-[50%] relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#39c3db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute w-full max-h-[200px] overflow-y-auto bg-white shadow-sm z-[9] p-4 mt-1">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={`${i.images[0]?.url}`}
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

          <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Your Shop" : "Shopkeeper ?"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden lg:flex items-center justify-between w-full bg-[#19525d]  h-[70px]`}
      >
        <div className={`w-11/12 mx-auto relative flex items-center justify-between`}>
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px]  1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`flex items-center`}>
            <Navbar active={heading} />
          </div>

          <div className="flex">
            <div className={`flex items-center`}>
              <div
                className={`relative cursor-pointer mr-[15px] ${
                  isAuthenticated ? "" : "pointer-events-none opacity-50"
                }`}
                onClick={isAuthenticated ? () => setOpenWishlist(true) : null}
                title={isAuthenticated ? "" : "Please login"}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                {isAuthenticated && wishlist && wishlist.length > 0 && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </div>

            <div className={`flex items-center`}>
              <div
                className={`relative cursor-pointer mr-[15px] ${
                  isAuthenticated ? "" : "pointer-events-none opacity-50"
                }`}
                onClick={isAuthenticated ? () => setOpenCart(true) : null}
                title={isAuthenticated ? "" : "Please login"}
              >
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
                {isAuthenticated && cart && cart.length > 0 && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>

            <div className={`flex items-center`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
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
        </div>
      </div>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}

      {/* mobile header */}
      <div className={`fixed w-full bg-slate-50 h-[70px] top-0 left-0 z-10 lg:hidden`}>
        <div className={`w-full flex items-center justify-between`}>
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 mt-3 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={ShopPlusPusLogo}
                alt=""
                className="mt-3 cursor-pointer"
                style={{ width: '150px', height: '35px' }}
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenCart(true)}
              />
              {cart && cart.length > 0 && (
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
            <div className={`fixed w-[60%] bg-red-200 h-screen top-0 left-0 z-10`}>
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart
                      size={30}
                      className="mt-5 ml-3 cursor-pointer"
                      onClick={() => {
                        setOpenWishlist(true);
                        setOpen(false);
                      }}
                    />
                    {wishlist && wishlist.length > 0 && (
                      <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                </div>
    <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Your Shop" : "Shopkeeper ?"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
                <RxCross1 size={30} className="ml-4 mt-5 cursor-pointer" onClick={() => setOpen(false)} />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={`h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md`}
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-[#fff] shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        return (
                          <Link to={`/product/${i._id}`} key={index}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={`${i.images[0]?.url}`}
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
                <AiOutlineSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />
              </div>

              <Navbar active={heading} />
              <div className={`w-full justify-center flex`}>
                {isAuthenticated ? (
                  <div className="my-4  ">
                   
                    <div >
                      <Link
                        to="/profile"
                        className="block mt-4 text-black font-bold"
                        onClick={() => setOpen(false)}
                      >
                         <div className="flex items-center text-white bg-black p-4 rounded-xl cursor-pointer">
                      <img
                        src={`${user?.avatar?.url}`}
                        className="w-[35px] h-[35px] rounded-full mr-2"
                        alt=""
                      />
                      <span>{user.name}</span>
                    </div>
                      </Link>
                     

                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block mt-4 text-black"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;