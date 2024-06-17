import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { TiUpload } from "react-icons/ti";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";
import { productName } from "../Store/Store";
import { useAtom } from "jotai";
import io from "socket.io-client";

const Header = () => {
  const [userID, setUserID] = useState(null);
  const [isLoggedIN, setIsLoggedIN] = useState(false);
  const [userData, setUserData] = useState({});
  const [listLength, setListLength] = useState(0);
  const navigate = useNavigate();
  const [, setProductTitle] = useAtom(productName);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    const newSocket = io("https://ecommerce-2-1ulr.onrender.com/");
=======
    const newSocket = io("https://ecommerce-2-k1zw.onrender.com/");
>>>>>>> 7d53756 (Initial commit)
    
    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setUserID(null);
    setIsLoggedIN(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Current token:", token);

    if (!token) {
      console.error("Token not found in cookies.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      if (decoded.id) {
        setUserID(decoded.id);
        setIsLoggedIN(true);
        const expirationTime = decoded.exp * 1000 - Date.now();
        if (expirationTime <= 0) {
          handleLogout();
        } else {
          setTimeout(handleLogout, expirationTime);
        }
      } else {
        console.error("No user ID found in token");
        handleLogout();
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout();
    }
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user/${userID}`);
        setUserData(response.data);
        const dataLength = response.data.List ? response.data.List.length : 0;
        setListLength(dataLength);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

  useEffect(() => {
    if (!socket) return;

    const handleProductSaved = (data) => {
      setUserData(data);
      const dataLength = data.List ? data.List.length : 0;
      setListLength(dataLength);
    };

    socket.on("productsaved", handleProductSaved);

    return () => {
      socket.off("productsaved", handleProductSaved);
    };
  }, [socket]);

  return (
    <header className="h-12 flex justify-between items-center bg-white border px-4 shadow-md">
      <img
        onClick={() => navigate("/")}
        className="w h-full cursor-pointer"
        src="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"
        alt="Amazon logo"
      />
      <div className="flex items-center w-[50%] p-2 bg-white shadow-md rounded-lg border">
        <FaSearch className="text-gray-500 ml-2" />
        <input
          onChange={(e) => setProductTitle(e.target.value)}
          className="ml-2 w-full h-full border-none focus:outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>
      {isLoggedIN ? (
        <div className="flex items-center gap-2 w-1/5 h-full rounded-lg px-2 bg-white">
          {userData && (
            <>
              <img
                className="cursor-pointer h-10 w-10 rounded-full object-cover"
                src={userData.Avatar}
                alt="Profile"
              />
              <h5 className="text-black font-medium">{userData.Username}</h5>
              <div
                onClick={() => navigate("/list")}
                className="flex h-full w-20 flex-col justify-center items-center"
              >
                {listLength > 0 && (
                  <div className="bg-red-500 h-5 w-5 rounded-full text-center text-white">
                    {listLength}
                  </div>
                )}
                <FaShoppingCart className="cursor-pointer text-xl text-black ml-2" />
              </div>
            </>
          )}
          <TiUpload
            onClick={() => navigate("/upload")}
            className="text-black text-xl font-medium cursor-pointer"
          />
      <button
  onClick={handleLogout}
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
>
  Logout
</button>

        </div>
      ) : (
        <div className="flex items-center gap-2 w-1/5 h-full rounded-lg px-2 bg-white">
          <TiUpload
            onClick={() => navigate("/login")}
            className="text-black font-medium cursor-pointer"
          />
          <button onClick={() => navigate("/register")} className="text-black">
            Register
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
