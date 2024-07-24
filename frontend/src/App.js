import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  UserActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./Routes/Routes.js";

import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./Routes/ShopRoutes";

import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./Routes/Shopkeeper";

import Store from "./redux/store";
import { useSelector } from "react-redux";
//import axios from 'axios';
//import { server } from './server.js';

import { userLoading } from "./redux/actions/user.js";

const App = () => {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(userLoading());
  }, []);

  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route
              path='/activation/:activation_string'
              element={<UserActivationPage />}
            />
            {/*  <Route path='/products' element={<ProductPage />} />*/}
            {/* <Route path='/best-selling' element={<BestSellingPage />} />*/}
            {/*   <Route path='/events' element={<EventsPage />} />*/}
            <Route path='/faq' element={<FAQPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/order/success:id' element={<OrderSuccessPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
