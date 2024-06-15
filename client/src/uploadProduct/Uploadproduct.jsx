import React, { useState } from "react";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";

const UploadProduct = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const postProduct = async () => {
    if (!Title || !Description || !Price || !Image) {
      alert("Please fill out all fields");
      return;
    }

    const productData = new FormData();
    productData.append("Title", Title);
    productData.append("Description", Description);
    productData.append("Price", Price);
    productData.append("Image", Image);

    try {
      setIsLoading(true);
      const res = await api.post("/addnew", productData);
      const data = res.data;
      setIsLoading(false);

      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("An error occurred while uploading the product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Name
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={postProduct}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadProduct;
