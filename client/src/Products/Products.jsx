import React, { useEffect, useState } from "react";
import api from "../API/Api";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAtom } from "jotai";
import { productName, productID } from "../Store/Store";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import io from 'socket.io-client';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductName] = useAtom(productName);
  const [currentProductID, setProductID] = useAtom(productID);
  const [transitioning, setTransitioning] = useState(false);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const newSocket = io("https://ecommerce-2-qzbh.onrender.com/");

    newSocket.on('connection', () => {
      console.log('Socket connected');
    });
    newSocket.on('productsaved', (data) => {
      toast.success("Product added to list");
      setIsLoading(false);
    });
    newSocket.on('error', (error) => {
    
      toast.error(error.message);
      setIsLoading(false);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setTransitioning(true);
        const res = await api.get("/products");
        let filteredItems = res.data;
        if (currentProductName) {
          filteredItems = res.data.filter((product) =>
            product.Title.toLowerCase().includes(
              currentProductName.toLowerCase()
            )
          );
        }
        setTimeout(() => {
          setProducts(filteredItems);
          setTransitioning(false);
        }, 300);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentProductName]);

  const addToList = (productId) => {
    if (!socket) return;
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      setIsLoading(true);
      socket.emit('addtolist', { productID: productId, userID: decoded.id });
    }
  };

  const navigateToViewProduct = (productId) => {
    setProductID(productId);
  };

  useEffect(() => {
    if (currentProductID !== null) {
      navigate(`/viewproduct/${currentProductID}`);
    }
  }, [currentProductID, navigate]);

  return (
    <div className="h-screen gap-5 bg-white flex flex-wrap p-4">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {products.map((product) => (
        <div
          key={product._id}
          className={`border border-gray-300 mt-4 h-[39%] w-80 bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ${transitioning ? 'transition-opacity duration-300 opacity-0' : ''}`}
        >
          <img
            onClick={() => navigateToViewProduct(product._id)}
            className="w-full h-48 object-cover cursor-pointer"
            src={product.Image}
            alt={product.Title}
          />
          <div className="p-4">
            <div className="font-bold text-xl block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis mb-2">{product.Title}</div>
            <p className="text-gray-700 block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-sm mb-4">{product.Description}</p>
            <div className="flex justify-between items-center">
              <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                ${product.Price}
              </span>
              <button
                onClick={() => addToList(product._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Add to List"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
