import { useState, useEffect } from "react";
import Home from "./Home/Home";
import Viewproduct from "./show-product/Viewprodcut";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Userlist from "./userList/Userlist";
import Login from "./Login/Login";
import Register from "./Register/Register";
import UploadProduct from "./uploadProduct/Uploadproduct";
import PaymentSuccess from "./succes page/Succes";
import Cookies from "js-cookie";

function App() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // Replace 'token' with your actual token key
    setHasToken(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewproduct/:productID" element={<Viewproduct />} />
        <Route path="/list" element={<Userlist />} />
        <Route path="/login" element={hasToken ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={hasToken ? <Navigate to="/" /> : <Register />} />
        <Route path="/upload" element={<UploadProduct />} />
        <Route path="/succes" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
