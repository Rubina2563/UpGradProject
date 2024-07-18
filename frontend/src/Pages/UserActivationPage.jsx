import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../server';

const UserActivationPage = () => {
  const { activation_string } = useParams();
  const [error, setError] = useState(false);
   const emailActivation = async(activation_string) => {
     try {
       const res = await axios.post(`${server}/user/activation`,
        {activation_string,}
       )
       console.log(res.data.message)
     } catch (error) {
       console.log(error.response.data.message);
       setError(true)
       }
      }

  useEffect(() => {
    if (activation_string) {
      emailActivation(activation_string);
    }
  }
,[activation_string])

  return (
<div class="w-full h-screen flex justify-center items-center">
  {error ? (
    <p>Your token is expired!</p>
  ) : (
    <p>Your account has been created successfully!</p>
  )}
</div>
  )
}

export default UserActivationPage