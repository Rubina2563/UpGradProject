import React, { useState } from "react";
import {Link} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='flex flex-col gap-3 items-center rounded h-auto  w-1/2 bg-slate-300 shadow-2xl rounded-3xl'>
        <h2 className='lg:h-25  sm:h-20 p-10 sm:p-6 text-center sm:text-2xl md:text-3xl lg:text-4xl font-extrabold'>
          Login your account
        </h2>
        <div className='lg:w-2/3 md:w-full sm:w-full h-full'>
          <form className="flex flex-col p-4 gap-4">
            
            <div className='flex flex-col p-4 gap-2 h-auto bg-slate-400 w-full m-1 shadow-slate-600 shadow-lg rounded-2xl'>
              <label
                htmlFor="email"
                className='block md:text-lg lg:text-2xl '>
                Email Address
              </label>
              <input
                 type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 className='block lg:w-3/4 md:w-full sm:w-full  shadow-xl rounded'></input>
            </div>

             <div className='flex flex-col p-4 gap-2 h-auto bg-slate-400 w-full m-1 shadow-slate-600 shadow-lg rounded-2xl'>
              <label
                htmlFor="password"
                className='block md:text-lg lg:text-2xl '>
                Password 
              </label>
              <input
                 type="password"
                  name="password"
                  autoComplete="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 className='block lg:w-3/4 md:w-full sm:w-full  shadow-xl rounded'></input>
            </div>

            <div className="flex justify-between p-3 bg-slate-200 rounded-lg">
              <input type="checkbox"
                name="remember me"
                id="remember me"
                className="w-5 h-5 "></input>
              <label  htmlFor="remember-me" className="text-xl font-medium text-blue-600">Remember me</label>
            </div>

             <div className="text-sm text-center">
                <a
                  href=".forgot-password"
                  className="font-medium text-xl  text-blue-900 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
            </div>
            
            <div className="space-y-6">
              <button className="bg-slate-600 rounded-md text-white sm:text-xl p-3 lg:text-2xl w-full hover:bg-slate-400">Submit</button>
            </div>

            <div className="flex justify-between p-3"><h2 className="sm:text-base text-red-500 font-semibold lg:text-xl">Don't have an account ?</h2> <Link to="/sign-up" className="text-blue-800 pl-2 font-semibold sm:text-base lg:text-xl hover:text-blue-500">
                Sign Up
              </Link></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
