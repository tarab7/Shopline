import React, { createContext, useState } from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Slider from "./Slider";
import Category from "./Category";
import Products from "./Products";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const Home = () => {

    return (
        <>
            <Slider/>
            <Category/>
            <Products home={true}/>
            <Newsletter/>
            <Footer/>
        </>
    )
}

export default Home;