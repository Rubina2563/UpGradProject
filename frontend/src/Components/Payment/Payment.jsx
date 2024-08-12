import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { useSnackbar } from "notistack";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);
  const amount = Math.floor(orderData?.totalPrice);

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and causing a page reload

    try {
      const res = await fetch(`${server}/payment/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      console.log("order details:", data.data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_FeT3JwrD0APeGM",
      amount: data.amount,
      currency: data.currency,
      name: "ShopPlusPlus",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(`${server}/payment/verify`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            // If payment verification is successful, proceed with order creation
            order.paymentInfo = {
              id: response.razorpay_payment_id,
              status: "succeeded",
              type: "Razorpay",
            };

            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };

            // Create the order
            await axios
              .post(`${server}/order/create-order`, order, config)
              .then((res) => {
                // Empty the cart and latest order
                localStorage.setItem("cartItems", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));

                // Navigate to the order success page
                navigate("/order/success");

                // Display success message
                enqueueSnackbar("Order successful", { variant: "success" });

                // Reload the page to update the cart state
                window.location.reload();
              });
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };



  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        enqueueSnackbar("Order successful", { variant: "success" });
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className='w-[90%] 1000px:w-[70%] block 800px:flex'>
        <div className='w-full 800px:w-[65%]'>
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
           
            handlePayment={handlePayment}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className='w-full md:w-[35%] md:mt-0 mt-8'>
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  
  handlePayment,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className='w-full md:w-[95%] bg-[#fff] rounded-md p-5 pb-8'>
      {/* paypal payment */}

      <br />
      {/* cash on delivery */}
      <div>
        <div className='flex w-full pb-5 border-b mb-2'>
          <div
            className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center'
            onClick={() => setSelect(3)}>
            {select === 3 ? (
              <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full' />
            ) : null}
          </div>
          <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'>
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className='w-full flex'>
            <form className='w-full' onSubmit={cashOnDeliveryHandler}>
              <input
                type='submit'
                value='Confirm'
                className={`w-[150px] my-3 flex items-center justify-center   !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
      <br />
      {/*razorpay*/}
      <div>
        <div className='flex w-full pb-5 border-b mb-2'>
          <div
            className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center'
            onClick={() => setSelect(4)}>
            {select === 4 ? (
              <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full' />
            ) : null}
          </div>
          <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'>
            Razorpay
          </h4>
        </div>

        {/* razorpay */}
        {select === 4 ? (
          <div className='w-full flex'>
            <form className='w-full' onSubmit={handlePayment}>
              <input
                type='submit'
                value='Pay '
                className={`w-[150px] my-3 flex items-center justify-center   !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className='w-full bg-[#fff] rounded-md p-5 pb-8'>
      <div className='flex justify-between'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>subtotal:</h3>
        <h5 className='text-[18px] font-[600]'>
          Rs {orderData?.subTotalPrice}
        </h5>
      </div>
      <br />
      <div className='flex justify-between'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>shipping:</h3>
        <h5 className='text-[18px] font-[600]'>Rs {shipping}</h5>
      </div>
      <br />
      <div className='flex justify-between border-b pb-3'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>Discount:</h3>
        <h5 className='text-[18px] font-[600]'>
          {orderData?.discountPrice ? "Rs " + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5 className='text-[18px] font-[600] text-end pt-3'>
        Rs {orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
