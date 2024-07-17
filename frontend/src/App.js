import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage, UserActivationPage } from "./Routes.js";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/activation/:url' element={<UserActivationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App