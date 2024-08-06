import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShopPlusPusLogo from "../../Static/ShopPlusPlus.svg";
import { categoriesData, productData } from "../../Static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
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
  const [wishlistCount, setWishlistCount] = useState(0); // Define wishlistCount state

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchWishlist(user._id));
      dispatch(fetchCartItems(user._id));
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    // Update wishlist count whenever the wishlist state changes
    if (wishlist) {
      setWishlistCount(wishlist.length);
    }
  }, [wishlist]);

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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

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
          <div className="w-[50%] relative">
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
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
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
                {isAuthenticated && wishlistCount > 0 && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlistCount}
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

            {/* cart popup */}
            {openCart && <Cart setOpenCart={setOpenCart} />}

            {/* wishlist popup */}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-[80px] bg-[#fff] z-50 top-0 left-0 shadow-sm lg:hidden`}
      >
        <div className="w-full flex items-center p-2 justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                style={{ width: '190px', height: '30px', marginTop: '10px' }}
                src={ShopPlusPusLogo}
                alt=""
              />
            </Link>
            <h2 className="font-bold text-3xl text-red-500">
              ShopPlusPlus
            </h2>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={isAuthenticated ? () => setOpenCart(true) : null}
              title={isAuthenticated ? "" : "Please login"}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart && <Cart setOpenCart={setOpenCart} />}

          {/* wishlist popup */}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </div>

        {/* header sidebar */}
        {open && (
          <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
            <div className="fixed w-[70%] bg-[#f6d4d4] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={isAuthenticated ? () => setOpenWishlist(true) : null}
                    title={isAuthenticated ? "" : "Please login"}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#f7d4d4] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;
                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`} key={i._id}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={heading} />
              <div className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center  cursor-pointer ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    {isSeller ? "Your Shop" : "Shopkeeper ?"}{" "}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-2xl pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-2xl text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
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