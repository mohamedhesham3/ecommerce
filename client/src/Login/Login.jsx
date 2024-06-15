import React, { useState } from "react";
import api from "../API/Api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [error, setError] = useState("");
  const nav=useNavigate()
  
  const login = async () => {
    try {
      const res = await api.post("/login", { Username, Password });
      const data = res.data;

      if (data.token) {
        Cookies.set("token", data.token);
        console.log("Tokens set successfully");
        location.href = "/";
        } else{
    
console.log('no token found');
        }
    } catch (error) {
      if (error.response) {

        const errorMessage = error.response.data.message
      setError(errorMessage)
      }


      console.log("Error during login:", error);
    }
  };

  
  return (
    <div className="min-h-screen gap-[20em] flex items-center justify-center bg-gray-100">
      <img
        className="h-[100px]"
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt=""
      />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            className="w-24 h-24 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Avatar"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
        <h4 className="text-red-500 flex justify-center">{error&&error}</h4>
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => SetUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => SetPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={login}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Login
        </button>
        
      <h4 className="text-cyan-700 cursor-pointer justify-center align-center text-center  text-1" onClick={() => {
            nav('/register')
            }}>dont have an account</h4>
      </div>
        
    </div>
  );
};

export default Login;
