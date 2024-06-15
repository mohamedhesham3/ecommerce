import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewProduct = () => {
  const [productData, setProductData] = useState(null); // Initialize as null
  const { productID } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewprodcut/${productID}`);
        const data = res.data;
        setProductData(data); // Set data directly, assuming it's a single object
      } catch (error) {
        console.log(error);
      }
    };

    if (productID) {
      getProduct();
    }
  }, [productID]);

  return (
    <>
      <Header />
      {productData && (
        <div key={productData._id} className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative pb-2/3">
            <img src={productData.Image} alt={productData.Title} className="inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800">{productData.Title}</h2>
            <p className="text-gray-600 mt-2">{productData.Description}</p>
            <p className="text-gray-800 mt-4 font-bold">Price: ${productData.Price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
