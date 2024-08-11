//corrected
import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useSnackbar } from 'notistack';

const ShopLogin = () => {
      const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        enqueueSnackbar("Login Success!", { variant: 'success' });
        navigate("/dashboard");
        window.location.reload(true); 
      })
      .catch((err) => {
          // Extracting the error message from the response
    const errorMessage = err.response?.data?.message || "An error occurred";

    // Using enqueueSnackbar to show the error message
    enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  };

   return (
    <div className='flex items-center justify-center h-screen '>

      <div className='flex flex-col gap-2 items-center  h-auto sm:w-[80%] md:w-2/3  bg-slate-300 shadow-2xl rounded-3xl'>
        
        <h2 className='h-auto p-3 text-center text-orange-800 sm:text-2xl md:text-3xl lg:text-4xl font-extrabold'>
          Login to your shop
        </h2>

        <div className='lg:w-2/3 md:w-full sm:w-full h-full'>
          
          <form className='flex flex-col p-4 gap-3' onSubmit={handleSubmit}>

            <div className='flex flex-col p-4 gap-2 h-auto bg-slate-400 w-full m-1 shadow-slate-600 shadow-lg rounded-2xl'>
              <label
                htmlFor='email'
                className='block md:text-lg lg:text-2xl font-medium  '>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block text-xl font-medium lg:w-3/4 md:w-full sm:w-full h-8 shadow-xl rounded'
              />
            </div>

            <div className='relative flex flex-col p-4 gap-2 h-auto bg-slate-400 w-full m-1 shadow-slate-600 shadow-lg rounded-2xl'>
              <label
                htmlFor='password'
                className='block md:text-lg lg:text-2xl font-medium '>
                Password
              </label>
              <div className='relative w-full lg:w-3/4 md:w-full sm:w-full'>
                <input
                  type={visible ? "text" : "password"}
                  name='password'
                  autoComplete='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block text-xl font-medium w-full h-8 shadow-xl rounded pr-10'
                />
                {visible ? (
                  <AiOutlineEye
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

         

          

            <div className='space-y-6 mx-4 w-1/2'>
              <button className='bg-slate-600 rounded-md text-white sm:text-xl p-3 lg:text-2xl w-1/2 hover:bg-slate-400'>
                Submit
              </button>
            </div>

            

          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;