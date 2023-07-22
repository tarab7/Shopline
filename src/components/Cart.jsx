import React, { useEffect, useState} from 'react'
import Footer from "./Footer"
import styled from "styled-components";
import { Add, LocalConvenienceStoreOutlined, Remove } from '@mui/icons-material';
import {mobile} from "../Responsive"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { update } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import BASE_URL from "../helper";

const Container=styled.div``;
const Wrapper=styled.div`
padding: 20px;
${mobile({padding:"10px"})}
`;
const Title=styled.h1`
font-weight: 200;
text-align: center;
`;
const Top=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`;

const TopButton=styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${props=>props.type==="filled" && "none"};
background-color: ${props=>props.type==="filled"? "black":"transparent"};
color: ${props=>props.type==="filled" && "white"};
`;

const Buttom=styled.div`
display: flex;
justify-content: center;
${mobile({flexDirection:"column"})}
`;

const TopTexts=styled.div`
display:flex;
justify-content: center;
${mobile({display:"none"})}
`
const TopText=styled.div`
text-decoration:underline;
cursor: pointer;
margin:0px 10px;
`
const Info=styled.div`
flex:3;
`;
const Product=styled.div`
display: flex;
justify-content: space-between;
${mobile({flexDirection:"column"})}
`
const ProductDetail=styled.div`
display: flex;
flex: 2;
`
const Image=styled.img`
width: 200px;
`
const Details=styled.div`
padding: 20px;
display: flex;
flex-direction:column;
justify-content: space-around;
`
const ProductName=styled.span``
const ProductId=styled.div``
const ProductSize=styled.span``
const PrizeDetail=styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const ProductAmountCont=styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`
const ProductAmt=styled.div`
font-size: 24px;
margin: 5px;
${mobile({margin:"5px 15px"})}
`
const ProductPrice=styled.div`
font-size: 30px;
font-weight: 200;
${mobile({marginBottom:"10px"})}
`
const Hr=styled.hr`
background-color: darkgray;
border: none;
height: 1px;
`
const Summary=styled.div`
flex:1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height:max-content;
`;

const SummaryTitle=styled.h1`
font-weight: 200; 
`
const SummaryItem=styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props=>props.type==="total" && "500"};
font-size: ${props=>props.type==="total" && "24px"};;
`
const SummaryItemText=styled.span``
const SummaryItemPrice=styled.span``
const SummaryButton=styled.button`
width: 100%;
padding: 10px;
background-color: black;
color:white;
font-weight: 600;
`
const Notfound=styled.h3`
  font-weight: 200;
  margin: auto auto;
  text-align: center;
`

const Cart = () => {

    const navigate=useNavigate();

    const cart=useSelector(state=>state.cart);

    
    const dispatch=useDispatch();

    const addOrder=async ()=>{
        let user=localStorage.getItem('user');
        if(!user)
        {
            alert("Please Login to Order!!");
            navigate("/login");
            return;
        }
        user=JSON.parse(user);
        let userId=user._id;
        let status="Received";
        if(cart.products.length===0)
        {
            alert("Cart is empty!!");
            return;
        }
        let amt=cart.total;
        let qty=cart.quantity;
        let result=await fetch(`${BASE_URL}/addOrder`,{
            method:'post',
            body: JSON.stringify({userId, status, qty, amt}),
            headers: {
                'Content-Type':'application/json'
            }
        } )
        result=await result.json();

        if(result)
        {
            dispatch(
                update()
            )
            navigate("/orders");
        }
            
    }

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
            <TopButton onClick={()=> navigate("/products")}>CONTINUE SHOPPING</TopButton>
            <TopTexts>
                <TopText>Shopping Bag ({cart.quantity})</TopText>
                <TopText>Your wishlist</TopText>
            </TopTexts>
            <TopButton type="filled" onClick={addOrder}>CHECK OUT NOW</TopButton>
        </Top>
        <Buttom>
            <Info>
                {
                    cart.products.length===0?
                    <Notfound> YOUR CART IS EMPTY!</Notfound>:               
                    
                        cart.products.map((item)=>(
                            <>
                        <Product>
                    <ProductDetail>
                        <Image src={item.img}/>
                        <Details>
                            <ProductName><b>Product: </b>{item.title}</ProductName>
                            <ProductId><b>Id: </b>{item._id}</ProductId>
                            <ProductSize><b>Color: </b>{item.color}</ProductSize>
                            <ProductSize><b>Size: </b>{item.s}</ProductSize>
                        </Details>
                    </ProductDetail>

                            <PrizeDetail>
                                <ProductAmountCont>
                                    <Add/>
                                    <ProductAmt>{item.qty}</ProductAmt>
                                    <Remove/>
                                </ProductAmountCont>
                                <ProductPrice>₹ {item.price*item.qty}</ProductPrice>
                            </PrizeDetail>
                        </Product>
                        <Hr/>
                        </>
                        ))
                
            }
            </Info>
       
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>SubTotal</SummaryItemText>
                    <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>₹ 100</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>₹ -100</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryButton onClick={addOrder}>CHECK OUT NOW</SummaryButton>
                </SummaryItem>
                
            </Summary>
        </Buttom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart
