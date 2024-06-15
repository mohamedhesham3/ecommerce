import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import api from "../API/Api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [Avatar, setAvatar] = useState(null);
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
const nav=useNavigate()
  const register = async() => { 
    const userdata=new FormData
    userdata.append('Username',Username)
    userdata.append('Email',Email)
    userdata.append('Password',Password)
    userdata.append('Avatar',Avatar)
    try {
      const res=await api.post('/register',userdata)
      const data=res.data
      
        console.log(data);
        Cookies.set('token',data.token)
        location.href='/'
    } catch (error) {
      if(error.response){

        const errorMessage = error.response.data.message
      setError(errorMessage)
      }
      console.log(error);
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
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <div className="mb-4">
          <h4 className="text-red-500 flex justify-center">{error&&error}</h4>

            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}

              placeholder="Enter your password"
            />
            <div className="border-[1px] h-40px items-center  flex flex-col justify-center  ">
              <input
                onChange={(e) => setAvatar(e.target.files[0])}
                className="hidden"
                id="img"
                type="file"
              />
              <label htmlFor="img">
                <BsFillImageFill className="cursor-pointer" />
              </label>
              {Avatar && (
                <img
                  className="h-[110px] w-[110px] rounded-[60px] "
                  src={URL.createObjectURL(Avatar)}
                  alt=""
                />
              )}
            </div>
          </div>
          <button
            onClick={register}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Login
            
          </button>

          <h4 className="text-cyan-700 cursor-pointer justify-center align-center text-center  text-1" onClick={() => {
            nav('/login')
            }}>Already have an account?</h4>
        
      </div>
    </div>
  );
};

export default Register;
