import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  SignUpPage,
  UserActivationPage,
  HomePage,
//  ProductPage,
//  BestSellingPage,
 // EventsPage,
  FAQPage
} from "./Routes.js";
import Store from "./redux/store";
import { useSelector } from 'react-redux';
//import axios from 'axios';
//import { server } from './server.js';

import { userLoading } from './redux/actions/user.js';

const App = () => {
const {loading } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(userLoading())
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
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App