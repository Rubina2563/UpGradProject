import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useSnackbar } from 'notistack';
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: 'success' });
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setZipCode("");
        setAddress("");
        setPhoneNumber("");
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.response?.data?.message || "An error occurred"}`, { variant: 'error' });
      });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='flex flex-col gap-2 items-center w-full max-w-lg bg-slate-300 shadow-2xl rounded-3xl'>
        <h2 className='p-3 text-orange-800 text-center text-2xl md:text-3xl lg:text-4xl font-extrabold'>
          Register as a Seller
        </h2>

        <div className='w-full'>
          <form className='flex flex-col p-4 gap-3' onSubmit={handleSubmit}>
            <div className='flex flex-col p-4 gap-2 bg-slate-400 rounded-2xl'>
              <label htmlFor='name' className='text-lg md:text-xl font-medium'>
                Shop Name
              </label>
              <input
                type='text'
                name='name'
                autoComplete='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='text-lg md:text-xl font-medium w-full h-10 shadow-xl rounded'
              />
            </div>

            <div className='flex flex-col p-4 gap-2 bg-slate-400 rounded-2xl'>
              <label htmlFor='phoneNumber' className='text-lg md:text-xl font-medium'>
                Phone Number
              </label>
              <input
                type='number'
                name='phoneNumber'
                autoComplete='tel'
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className='text-lg md:text-xl font-medium w-full h-10 shadow-xl rounded'
              />
            </div>

            <div className='flex flex-col p-4 gap-2 bg-slate-400 rounded-2xl'>
              <label htmlFor='email' className='text-lg md:text-xl font-medium'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='text-lg md:text-xl font-medium w-full h-10 shadow-xl rounded'
              />
            </div>

            <div className='flex flex-col p-4 gap-2 bg-slate-400 rounded-2xl'>
              <label htmlFor='address' className='text-lg md:text-xl font-medium'>
                Address
              </label>
              <input
                type='text'
                name='address'
                autoComplete='street-address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='text-lg md:text-xl font-medium w-full h-10 shadow-xl rounded'
              />
            </div>

            <div className='flex flex-col p-4 gap-2 bg-slate-400 rounded-2xl'>
              <label htmlFor='zipCode' className='text-lg md:text-xl font-medium'>
                Zip Code
              </label>
              <input
                type='number'
                name='zipCode'
                autoComplete='postal-code'
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className='text-lg md:text-xl font-medium w-full h-10 shadow-xl rounded'
              />
            </div>

            <div className='relative flex flex-col p-4 gap-2 bg-slate-400 rounded-2xl'>
              <label htmlFor='password' className='text-lg md:text-xl font-medium'>
                Password
              </label>
              <div className='relative w-full'>
                <input
                  type={visible ? "text" : "password"}
                  name='password'
                  autoComplete='new-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='text-lg md:text-xl font-medium w-full h-10 shadow-xl rounded pr-10'
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

            <div className='flex items-center justify-between p-3 bg-slate-200 rounded-lg'>
              <span className="w-8 h-8 rounded-full">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full overflow-hidden rounded-full object-cover"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label>
                <span className="text-md font-semibold shadow-md text-cyan-800 border border-black p-3 rounded-lg bg-white">
                  Upload your pic
                </span>
                <input
                  type='file'
                  name='avatar'
                  id='file-input'
                  accept='.jpg,.jpeg,.png'
                  onChange={handleFileInputChange}
                  className='sr-only'
                />
              </label>
            </div>

            <div className='space-y-6'>
              <button className='bg-slate-600 rounded-md text-white text-lg md:text-xl p-3 w-full hover:bg-slate-400'>
                Submit
              </button>
            </div>

            <div className='flex justify-between p-3'>
              <h2 className='text-red-500 font-semibold text-base md:text-lg'>
                Already have an account?
              </h2>
              <Link
                to='/shop-login'
                className='text-blue-800 pl-2 font-semibold text-base md:text-lg hover:text-blue-500'>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;