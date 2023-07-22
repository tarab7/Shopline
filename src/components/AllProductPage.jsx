import React, { useState } from 'react'
import styled from "styled-components";
import Products from "./Products";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import {mobile} from "../Responsive"
import { useLocation } from 'react-router-dom';

const Container=styled.div`
`
const Title=styled.h1`
margin-top: 20px;
margin-left: 20px;
`
const FilterContainer=styled.div`
display: flex;
justify-content: space-between;
${mobile({width:"90vw"})}
`
const Filter=styled.div`
margin: 20px;
display: flex;
flex-wrap: wrap;
${mobile({width:"0px 20px", display:"flex", flexDirecton:"column"})}
`
const Filtertext=styled.div`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
${mobile({marginRight:"0px"})}
`
const Select=styled.select`
padding: 10px;
margin-right: 20px;
${mobile({margin:"10px 0px"})}
`
const Option=styled.option`
font-size: 20px;
`
const AllProductPage = () => {
  
  const location=useLocation();
  const cat=location.pathname.split("/")[2];
  const [filters, setFilters]=useState({});
  const [sort, setSort]=useState("newest");
  const [home, setHome]=useState(false);

  const handleFilters=(e)=>{
    const value=e.target.value;
      setFilters({
        ...filters,
        [e.target.name]:value
      })
  }

  return (
    <>
    <Container>
    <Title>{cat? cat: "All Products"}</Title>
      <FilterContainer>
        <Filter>
            <Filtertext>Filter Products:</Filtertext>
            <Select name="color" onChange={handleFilters}>
                <Option disabled selected>Color</Option>
                <Option>Black</Option>
                <Option>Brown</Option>
                <Option>Blue</Option>
                <Option>Red</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>
                <Option>White</Option>
                <Option>Gray</Option>
                <Option>Gold</Option>
                <Option>Silver</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
                <Option disabled selected>Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
            </Select> 
        </Filter>        
        <Filter>
            <Filtertext>Sort Products:</Filtertext>
            <Select onChange={(e)=>setSort(e.target.value)}>
                <Option value="newest">Newest</Option>
                <Option value="asc">Price (asc)</Option>
                <Option value="desc">Price (desc)</Option>
            </Select> 
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} home={home}/>
    </Container>
    <Newsletter/>
      <Footer/>
      </>
  )
}

export default AllProductPage
