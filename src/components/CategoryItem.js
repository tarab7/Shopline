import React from 'react'
import styled from 'styled-components'
import {mobile, tablet} from "../Responsive"
import { useNavigate } from 'react-router-dom'

const Container=styled.div`
margin: 3px;
height:50vh;
width: 300px;
position: relative;
${mobile({height:"300px", width:"90vw"})}
${tablet({height:"300px", width:"30vw"})}
`
const Image=styled.img`
width: 100%;
height: 100%;
object-fit: cover;
${mobile({height:"300px", width:"80vw"})}
`
const Info=styled.div`
position: absolute;
top:0;
left:0;
width: 100%;
height:100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
${mobile({alignSelf:"center"})}
`
const Title=styled.h1`
color:white;
margin-bottom: 20px;
`
const Button=styled.button`
border: none;
padding: 10px;
background-color: white;
color:gray;
cursor: pointer;
`

const CategoryItem = ({item}) => {

  const navigate=useNavigate();

  return (
     
    <div>
      <Container>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button onClick={()=>navigate(`/products/${item.title}`)}>SHOP NOW</Button>
        </Info>
      </Container>
    </div>
  )
}

export default CategoryItem;
