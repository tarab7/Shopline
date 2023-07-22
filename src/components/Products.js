import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductItem from './ProductItem';
import {mobile} from "../Responsive"
import BASE_URL from "../helper";

const Container=styled.div`
padding:20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
${mobile({width:"70vw", flexDirection:"column"})}
`
const Title=styled.h3`
margin-left:20px;
margin-top:20px;
`
const Notfound=styled.h3`
  font-weight: 200;
  margin: auto auto;
`
const Products = ({cat, filters, sort, home}) => {
  const[products, setProducts]=useState([]);
  const[filterProducts, setFilterProducts]=useState([]);

  //Jb bi cat change hoga run useEffect function
  useEffect(()=>{

      const getProducts=async()=>{
        let result=await fetch(
          cat ? 
          `${BASE_URL}/products?category=${cat}` 
          : `${BASE_URL}/products`
          
          ,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setProducts(result);
        setFilterProducts(result);
        console.log(products);
    }
        getProducts();
    }, [cat])   


    useEffect(()=>{
      setFilterProducts(
        products.filter((item)=>
          Object.entries(filters).every(([key,value])=>
              item[key].includes(value)
            )
          )
      )
  }, [filters]);

  useEffect(()=>{
    if(sort=="newest")
    {
      setFilterProducts((prev)=>
        [...prev].sort((a,b)=>a.createdAt- b.createdAt)
        )
    }
    else if(sort=="asc")
    {
      setFilterProducts((prev)=>
        [...prev].sort((a,b)=>a.price- b.price)
        )
    }
    else{
      setFilterProducts((prev)=>
        [...prev].sort((a,b)=>b.price- a.price)
        )
    }
  },[sort])

  return (
    <>
    
    <Container>
      {
        filterProducts.length==0?
              <Notfound> NO PRODUCTS FOUND.</Notfound>
            :

            cat? filterProducts.map((item)=>(
              <ProductItem item={item} key={item._id}/>
              )):
              <>
                {
                  home?
                  filterProducts.slice(0,4).map((item)=>(
                    <ProductItem item={item} key={item._id}/>
                    ))  //Agr home se render hua hai means slice krke 0 to 8 items hi show kro
                    :
                    filterProducts.map((item)=>(
                    <ProductItem item={item} key={item._id}/>
                    ))  //Otherwise saare items show kro
                }
              </>
      }
    </Container>
    </>
  )
}

export default Products;
