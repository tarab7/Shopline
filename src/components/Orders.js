import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import styled from "styled-components";
import {mobile, tablet} from "../Responsive"
import BASE_URL from "../helper";

const Container=styled.div`

`
const Title=styled.h1`
margin-top: 20px;
margin-left: 20px;
`
const Notfound=styled.h3`
  font-weight: 200;
  margin: auto auto;
  text-align: center;
`
const Hr=styled.hr`
background-color: darkgray;
border: none;
height: 1px;
`
const List=styled.p`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  ${mobile({flexDirection:"column"})}
`
const Orders = () => {
  const [myorders, setMyorders]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    let user=localStorage.getItem('user');
    if(!user)
    {
      alert("Please Login to access your Orders!");
      navigate("/");
      return;
    }
    
    user=JSON.parse(user);
    let userId=user._id;
    const getOrders=async()=>{
      let result=await fetch(`${BASE_URL}/getOrder/${userId}`,{
            method:'get',
            headers: {
                'Content-Type':'application/json'
            }
        });
        result=await result.json();
        console.log(result);
          setMyorders(result);
    }
    getOrders();
  }, [])

  console.log(myorders);

  return (
    <>
    <Container>
      <Title>My Orders</Title>
      </Container>
        {
          myorders.length==0?
          <Notfound> YOU HAVE NO ORDERS! </Notfound>
          :
            <ul class="list-group">
              {
                myorders.map((item, index)=>(
                  <>
                <List>
                  <span><b>{index+1}. </b></span>
                  <span><b>Order Id: </b>{item._id}</span>
                  <span><b>Ordered on: </b>{item.createdAt}</span>
                  <span><b>Quantity: </b>{item.qty}</span>
                  <span><b>Amount: </b>{item.amt}</span>
                  <span><b>Status: </b>{item.status}</span>
                </List>
                <Hr/>
                </>
              ))
              }
            </ul>
        }
      <Newsletter/>
        <Footer/>
      </>
  )
}

export default Orders
