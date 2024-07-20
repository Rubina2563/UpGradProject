import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage, UserActivationPage } from "./Routes.js";
import Store from "./redux/store";
//import axios from 'axios';
//import { server } from './server.js';

import { userLoading } from './redux/actions/user.js';

const App = () => {

  useEffect(() => {
    Store.dispatch(userLoading())
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route
          path='/activation/:activation_string'
          element={<UserActivationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App