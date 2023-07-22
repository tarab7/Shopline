import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import url6 from "../images/jackets.jpg";
import { Add, Remove } from '@mui/icons-material';
import Footer from "./Footer"
import {mobile, tablet} from "../Responsive"
import { useLocation } from 'react-router-dom';
import cartContext from "./cartContext"
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import BASE_URL from "../helper";

const Container=styled.div`

`
const Wrapper=styled.div`
padding: 50px;
display: flex;
${mobile({padding:"10px", flexDirection:"column"})}
${tablet({padding:"10px", flexDirection:"column"})}
`
const ImgContainer=styled.div`
flex: 1;
`
const Image=styled.img`
width: 90%;
height: 80vh;
object-fit: cover;
${mobile({height:"40vh"})}
${tablet({height:"50vh", width:"45vh"})}
`
const InfoContainer=styled.div`
flex: 1;
padding: 0px 50px;
${mobile({padding :"10px"})}
${tablet({padding :"10px"})}
`
const Title=styled.div`
font-weight: 500;
font-size: 20px;
`
const Desc=styled.div`
margin: 20px 0px;
`
const Price=styled.div`
font-size: 40px;
font-weight: 100;
${tablet({paddingLeft:"20px"})}
`
const FilterContainer=styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
${mobile({width:"100%"})}
${tablet({width:"100%", justifyContent: "space-around"})}
`
const Filter=styled.div`
display: flex;
align-items: center;
`
const Filtertitle=styled.span`
font-size: 20px;
font-weight: 200;
`
const FilterSize=styled.select`
margin-left: 10px;
padding: 5px;
`
const FilterSizeOption=styled.option`
font-size: 20px;
`

const AddContainer=styled.div`
display: flex;
align-items: center;
width: 50%;
justify-content: space-between;
${mobile({width:"100%"})}
${tablet({width:"100%", justifyContent: "space-around"})}
`
const AmountContainer=styled.div`
display: flex;
align-items: center;
font-weight: 700;
`
const Amount=styled.span`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin:0px 5px;
`
const Button=styled.button`
padding: 15px;
border:1px solid teal;
background-color: white;
cursor:pointer;
font-weight: 500;
&:hover{
    background-color: #f8f8f4;
}
`

const ProductPage = () => {

  const location=useLocation();
  let prodId=location.pathname.split("/")[2];
  const [product, setProduct]=useState({});
    const [qty, setQty]=useState(1);
    const [c, setC]=useState("");
    const [s, setS]=useState("");
    var sizes=["XL","L","M","S","XS"];
    const dispatch=useDispatch();


    useEffect(()=>{
        const getProduct=async()=>{
            let result=await fetch( `${BASE_URL}/getProduct/${prodId}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result=await result.json();
            setProduct(result);
            setC(product.color);
            console.log(sizes);
            console.log(product.size);
        }
            getProduct();
    },[prodId]);

    const settingSize=(e)=>{
        setS(e)
    }

    const handleQty=(type)=>{
        if(type=="dec")
        {
            setQty(qty-1<0 ? 0: qty-1)
        }
        else{
            setQty(qty+1)
        }
    }
    const addCart=async ()=>{
        dispatch(
            addProduct({...product, qty, c, s})
        )

    }

  return (
    <Container>
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>₹{product.price}</Price>
                Color: {product.color}
                <FilterContainer>
                    <Filter>
                        <Filtertitle>Size: </Filtertitle>
                        <FilterSize onChange={(e)=>setS(e.target.value)}>
                            {
                                product.size?.map((i)=>(
                                    <FilterSizeOption key={i}>{i}</FilterSizeOption>
                                ))
                            }
                        </FilterSize>
                           
                    </Filter>
                </FilterContainer>

                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQty("dec")}/>
                        <Amount>{qty}</Amount>
                        <Add onClick={()=>handleQty("inc")}/>
                    </AmountContainer>
                    <Button onClick={addCart}>ADD TO CART</Button>
                </AddContainer>

            </InfoContainer>
    
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default ProductPage

/*
{
                            product.size.map((i)=>(
                                <FilterSize onChange={()=>setS(i)}>{i}</FilterSize>
                            ))
                        }
                        */