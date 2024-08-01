import React, { useState } from "react";
import { Link} from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";

import { useSnackbar } from 'notistack';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
 // const navigate = useNavigate();
 
 const { enqueueSnackbar } = useSnackbar();
 const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/user/create-user`, { name, email, password, avatar })
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: 'success' });
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
      })
      .catch((error) => {
         enqueueSnackbar(`Error: ${error.response.data.message}`, { variant: 'error' });
      });
  };


  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='flex flex-col gap-2 items-center sm:w-[90%] md:w-[70%] lg:w-2/3 h-auto   bg-slate-300 shadow-2xl rounded-3xl'>
        <h2 className='h-auto p-3 text-orange-800 text-center sm:text-2xl md:text-3xl lg:text-4xl font-extrabold'>
          SignUp Account
        </h2>

        <div className='lg:w-2/3 md:w-full sm:w-full h-full'>
          <form className='flex flex-col p-4 gap-3' onSubmit={ handleSubmit }>
            <div className='flex flex-col p-4 gap-2 h-auto bg-slate-400 w-full m-1 shadow-slate-600 shadow-lg rounded-2xl'>
              <label
                htmlFor='name'
                className='block md:text-lg lg:text-2xl font-medium  '>
                Name
              </label>
              <input
                type='text'
                name='name'
                autoComplete='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block text-xl font-medium lg:w-3/4 md:w-full sm:w-full h-8 shadow-xl rounded'
              />
            </div>

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

            <div className='flex justify-between h- auto p-3 bg-slate-200 rounded-lg'>
                          <span className="w-8 h-8 rounded-full  ">
                              {
                                  avatar ? (<img src={avatar} alt="avatar" className="w-full h-full overflow-hidden rounded-full object-cover"/>) : ( <RxAvatar className="h-8 w-8" />)
                              }
              </span>
              <label>
                <span className="text-md font-semibold shadow-md  text-cyan-800 border border-black p-3 rounded-lg bg-white">Upload your pic</span>
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
              <button className='bg-slate-600 rounded-md text-white sm:text-xl p-3 lg:text-2xl w-full hover:bg-slate-400'>
                Submit
              </button>
            </div>

            <div className='flex justify-between p-3'>
              <h2 className='sm:text-base text-red-500 font-semibold lg:text-xl'>
                Have an account already?
              </h2>
              <Link
                to='/login'
                className='text-blue-800 pl-2 font-semibold sm:text-base lg:text-xl hover:text-blue-500'>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;