import React from 'react';
import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {mobile} from "../Responsive"
import { Link } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const Info=styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top:0;
left:0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor:pointer
`

const Container=styled.div`
    flex:1;
    margin: 5px;
    width: 400px;
    height:350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    ${mobile({height:"50vh", width:"80vw"})}
    &:hover ${Info}{
        opacity: 1;
    }
`

const Circle=styled.div`
width: 200px;
height:200px;
border-radius: 50%;
background-color: white;
position: absolute;
`
const Image=styled.img`
height: 75%;
z-index: 2;
${mobile({width:"60vw"})}
`
const Icon=styled.div`
width: 40px;height:40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items:center;
justify-content:center;
margin: 10px;
transition: all 0.5s ease;
&:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
}
`

const ProductItem = ({item}) => {
  const dispatch=useDispatch();
  let qty=1;
  let c=item.color;
  const addCart=async ()=>{
        dispatch(
            addProduct({...item, qty, c})
        )

    }

  return (
    <Container>
      <Circle/>
      <Image src={item.img}/>
      <Info>
        <Icon onClick={addCart}>
            <ShoppingCartIcon/>
        </Icon>
        <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchIcon/>
            </Link>
        </Icon>
        <Icon>
            <FavoriteBorderIcon/>
        </Icon>
      </Info>
    </Container>
  )
}

export default ProductItem
