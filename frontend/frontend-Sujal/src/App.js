import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Registerpage/Register";
import Login from "./Pages/loginpage/Login";
import Navbar from "./Components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Profile from "./Pages/Profile";
import Productpage from "./Pages/Productpage/Productpage";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Pages/About/About";
import Category from "./Pages/catagory/Category";
import Bowls from "./Pages/Carts/Bowls/Bowls";
import Plates from "./Pages/Carts/Plates/Plates";
import Mug from "./Pages/Carts/Mug/Mug";
import Vase from "./Pages/Carts/Vase/Vase";
import Success from "./Pages/Payment/Success";
import Failure from "./Pages/Payment/Failure";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminUpdate from "./Pages/Admin/AdminUpdate";
import SearchResults from "./Pages/Search/Searchresult";
import Cart from "./Pages/Carts/Cart/Cart";

function App() {
  return (
    <div>
      <>
        {" "}
        <FontAwesomeIcon icon="fa-brands fa-facebook" />
      </>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productpage" element={<Productpage />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/About" element={<About />} />
          <Route path="/Bowls" element={<Bowls />} />
          <Route path="/Plates" element={<Plates />} />
          <Route path="/Mug" element={<Mug />} />
          <Route path="/Vase" element={<Vase />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Failure" element={<Failure />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/update/:id" element={<AdminUpdate />} />
          <Route path="/bowls" element={<Bowls />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
