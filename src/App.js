import react, { useState } from 'react';
import Navbar from './components/Navbar';
import {Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login"
import Announcement from "./components/Announcement"
import AllProductPage from './components/AllProductPage';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Orders from './components/Orders';

function App() {


  return (
    <>
      <Announcement/>
        <Navbar/>

        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/products/:category" element={<AllProductPage/>} />
          <Route exact path="/products" element={<AllProductPage/>} />
          <Route exact path="/product/:id" element={<ProductPage/>} />
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path='/orders' element={<Orders/>}/>
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </>
  );
}

export default App;
