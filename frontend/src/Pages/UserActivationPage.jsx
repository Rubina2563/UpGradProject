import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { useNavigate } from "react-router-dom";

const UserActivationPage = () => {
  const { activation_string } = useParams();
  const [error, setError] = useState(false);
 const navigate = useNavigate();
  useEffect(() => {
    if (activation_string) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_string,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);



  return (
    <div className="w-full h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <div className="text-center">
          <p>Your account has been created successfully!</p>
          <p>Click below to login to your account</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};



export default UserActivationPage