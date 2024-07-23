import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignUp from '../Components/SignUp/SignUp.jsx';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
     const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  return (
   <SignUp/>
  )
}

export default SignUpPage