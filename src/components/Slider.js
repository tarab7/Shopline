import React, { useState } from 'react'
import styled from 'styled-components';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {sliderItems} from "../data";
import {mobile, tablet} from "../Responsive"
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    position:relative;
    overflow:hidden; 
    ${mobile({display:"none"})}
    ${tablet({height:"40vh", width:"95vw"})}
`
const Arrow = styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    display: flex;
    align-items:center;
    justify-content: center;
    position:absolute;
    top:0;
    bottom:0;
    left: ${props => props.direction === 'left' && "10px"};
    right: ${props => props.direction === 'right' && "10px"};
    margin: auto;
    opacity:0.5;
    z-index: 2;
`

const Wrapper = styled.div`
height: 100px;
display: flex;
transition: all 1.5s ease ;
transform: translateX(${props=>props.slideIndex * -100}vw);
`
const Slides = styled.div`
display: flex;
align-items: center;
width: 100vw;
height: 100vh;
background-color: ${props=> props.bg};
${tablet({height:"40vh"})}
`
const Img = styled.img`
height: 80%;
${tablet({height:"90%"})}
`
const ImgContainer = styled.div`
height: 100%;
flex:1;
${tablet({width:"50vh"})}
`
const InfoContainer = styled.div`
flex:1;
padding: 50px;
${tablet({height:"60%", padding:"0px 0px"})}
`
const Title=styled.h1`
font-size:70px;
${tablet({fontSize:"40px"})}
`
const Descp=styled.p`
margin: 50px 0px;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
${tablet({margin:"3px 0px"})}
${tablet({fontSize:"15px"})}
`
const Button=styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
${tablet({margin:"10px 0px"})}
`

const Slider = () => {
    const navigate=useNavigate();
    const [slideIndex, setSlideIndex]=useState(0);

    const handleClick=(dir)=>{
        if(dir==='left'){
            setSlideIndex(slideIndex>0? slideIndex-1: 5);
        }else{
            setSlideIndex(slideIndex<5? slideIndex+1: 0);
        }
    };


    return (
        <div>
            <Container>
                <Arrow direction="left" onClick={()=>handleClick("left")}>    {/*Props ke through directions*/}
                    <ArrowLeftIcon />
                </Arrow>

                <Wrapper slideIndex={slideIndex}>
                    {
                        sliderItems.map((item)=>(

                    <Slides bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Img src={item.img} />
                        </ImgContainer>

                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Descp>{item.desc}</Descp>
                            <Button onClick={()=>navigate("/products")}>SHOP NOW!</Button>
                        </InfoContainer>
                    </Slides>
                        )
                    )}

                </Wrapper>

                <Arrow direction="right" onClick={()=>handleClick("right")}>
                    <ArrowRightIcon />
                </Arrow>
            </Container>
        </div>
    )
}

export default Slider
