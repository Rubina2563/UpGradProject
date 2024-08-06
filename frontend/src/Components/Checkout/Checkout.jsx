import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { useSnackbar } from 'notistack';

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPrice).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${server}/coupon/get-coupon-value/${couponCode}`);
      const shopId = data.couponCode?.shopId;
      const couponValue = data.couponCode?.value;

      if (!data.couponCode) {
        enqueueSnackbar("Coupon code doesn't exist!", { variant: 'error' });
        setCouponCode("");
        return;
      }

      const validItems = cart.filter((item) => item.product.shopId === shopId);
      if (validItems.length === 0) {
        enqueueSnackbar("Coupon code is not valid for this shop", { variant: 'error' });
        setCouponCode("");
        return;
      }

      const eligiblePrice = validItems.reduce(
        (acc, item) => acc + item.quantity * item.product.discountPrice,
        0
      );

      const discount = (eligiblePrice * couponValue) / 100;
      setDiscountPrice(discount);
      setCouponCodeData(data.couponCode);
      setCouponCode("");
    } catch (error) {
      console.error("Error applying coupon code:", error);
      enqueueSnackbar("Error applying coupon code. Please try again later.", { variant: 'error' });
    }
  };

  const handlePaymentSubmit = () => {
    if (!address1 || !address2 || !zipCode || !country || !city || !phoneNumber) {
      enqueueSnackbar("Please complete your delivery address!", { variant: 'error' });
      return;
    }

    const shippingAddress = {
      address1,
      address2,
      zipCode,
      country,
      city,
      phoneNumber,
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    };

    // Update local storage with the updated orders array
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </div>
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData
            handleSubmit={handleCouponSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPrice}
          />
        </div>
      </div>
      <div
        className={`bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer w-[150px] md:w-[280px] mt-10`}
        onClick={handlePaymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
    <div className="w-full md:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user?.name || ''}
              required
              className={`border p-1 rounded-[5px] !w-[95%]`}
              readOnly
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              required
              className={`w-full border p-1 rounded-[5px]`}
              readOnly
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={`w-full border p-1 rounded-[5px] !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`w-full border p-1 rounded-[5px]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Choose your country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">State</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Choose your state</option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`border p-1 rounded-[5px] !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`w-full border p-1 rounded-[5px]`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {user?.addresses.map((item, index) => (
            <div className="w-full flex mt-1" key={index}>
              <input
                type="checkbox"
                className="mr-3"
                value={item.addressType}
                onClick={() => {
                  setAddress1(item.address1);
                  setAddress2(item.address2);
                  setZipCode(item.zipCode);
                  setCountry(item.country);
                  setCity(item.city);
                  setPhoneNumber(item.phoneNumber || ''); // Set phone number if available
                }}
              />
              <h2>{item.addressType}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">Rs {subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">Rs {shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {discountPercentenge > 0 ? `- Rs ${discountPercentenge.toFixed(2)}` : "None"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">Rs {totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`w-full border p-1 rounded-[5px] h-[40px] pl-2`}
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border bg-red-400 text-white font-bold border-[#f63b60] text-center rounded-[3px] mt-8 cursor-pointer`}
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;