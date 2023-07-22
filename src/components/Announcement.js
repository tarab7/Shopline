import React from "react";
import styled from "styled-components";
import {mobile} from "../Responsive"

const Container=styled.div`
height: 30px;
background-color:#00838f;
color:white;
text-align: center;
width:"100vw";
${mobile({width:"100vw", display:"flex"})}
`
const Announcement=()=>{
    return(
        <Container>
            Super Deal! Free Shipping on Orders Over ₹999
        </Container>
    )
}

export default Announcement;