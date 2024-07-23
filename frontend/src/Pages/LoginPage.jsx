import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from '../Components/Login/Login.jsx';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  return (
    <Login/>
  )
}

export default LoginPage