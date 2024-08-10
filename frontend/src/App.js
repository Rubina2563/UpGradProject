import React, { useEffect, useState } from "react";
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
} from "./Routes/Routes.js";

import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupons,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./Routes/ShopRoutes";



import Store from "./redux/store";
import { loadSeller, userLoading } from "./redux/actions/user";
import ProtectedRoute from "./Routes/ProtectedRoute";

import { ShopHomePage } from "./Routes/ShopRoutes.js";
import SellerProtectedRoute from "./Routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
 

  useEffect(() => {
    Store.dispatch(userLoading());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route
          path='/activation/:activation_string'
          element={<UserActivationPage />}
        />
        <Route
          path='/seller/activation/:activation_token'
          element={<SellerActivationPage />}
        />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route
          path='/checkout'
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path='/order/success' element={<OrderSuccessPage />} />
        {/* Removed duplicate /payment route */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/order/:id'
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/track/order/:id'
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path='/shop/preview/:id' element={<ShopPreviewPage />} />
        <Route path='/shop-create' element={<ShopCreatePage />} />
        <Route path='/shop-login' element={<ShopLoginPage />} />
        <Route path='/admin/shop-login' element={<ShopLoginPage />} />
        <Route
          path='/shop/:id'
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-create-product'
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-orders'
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-refunds'
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-order/:id'
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-products'
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-create-event'
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-events'
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-coupouns'
          element={
            <SellerProtectedRoute>
              <ShopAllCoupons />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-withdraw-money'
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/dashboard-messages'
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path='/payment'
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
