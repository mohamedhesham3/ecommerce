import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../API/Api";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Userlist = () => {
  const [userID, setUserID] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
const nav=useNavigate()
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserID(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.log("No access token found");
          return;
        }

        const response = await api.get(`/user/${userID}`);
        setSavedProducts(response.data.List);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

  const removeProduct = async (productId) => {
    try {
      const res = await api.post(`/removefromlist/${productId}`, {
        userID: userID,
      });
  
      if (res.data) {
        toast.success("Product removed successfully");
        setSavedProducts(savedProducts.filter((product) => product._id !== productId));
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product from list:", error);
      toast.error("An error occurred while removing the product");
    }
  };
  



const buy = async(prodcutID) => {
  try {
    const res= await api.post("/payment",{prodcutID:prodcutID})
    const URL=res.data
    location.href=URL.url
    console.log(prodcutID);
  } 
  catch (error) {
    console.log(error);
  }

}



  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="border-[1px] h-[5em] w-[100%] flex justify-center items-center border-solid">
        <h1 className="font-[system-ui] text-xl">{savedProducts.length} Products Found in your list</h1>
      </div>
      {savedProducts &&
        savedProducts.map((product, i) => (
          <div
          key={i}
          className="flex flex-col justify-start  border-solid items-start gap-4 bg-white p-4"
        >
          <div className="bg-white rounded-lg shadow-lg p-2">
            <img
              src={product.Image}
              alt={product.Title}
              className="w-full h-32 object-cover rounded"
            />
            <div className="mt-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold mr-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-20">
                {product.Title}
              </h2>
              <p className="text-gray-600 text-sm mr-2">{product.Price}$</p>
              <button
                onClick={() => buy(product._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 text-xs rounded mr-2"
              >
                Buy
              </button>
              <AiFillDelete
                onClick={() => removeProduct(product._id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        ))}
    </>
  );
};

export default Userlist;
