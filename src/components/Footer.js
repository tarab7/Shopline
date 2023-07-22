import React from 'react'
import styled from 'styled-components';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import {mobile} from "../Responsive"

const Container=styled.div`
display: flex;
${mobile({flexDirection:"column", paddingBottom:"10vh"})}
`
const Left=styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
`
const Center=styled.div`
flex:1;
padding: 20px;
${mobile({display:"none"})}
`
const Right=styled.div`
flex:1;
padding: 20px;
${mobile({backgroundColor:"#fff8f8"})}
`
const Title=styled.h3`
margin-bottom:20px;
`
const List=styled.ul`
margin:0;
padding:0;
list-style: none;
display: flex;
flex-wrap: wrap;
`
const ListItem=styled.ul`
width: 50%;
margin-bottom:5px;
`
const Logo=styled.h1`
`
const Desc=styled.p`
margin: 20px 0px;
`
const SocialContainer=styled.div`
display:flex;
`
const SocialIcon=styled.div`
width: 40px;
height:40px;
border-radius: 50%;
color:white;
background-color: ${props=> props.color};
display: flex;
justify-content: center;
align-items: center;
margin-right: 20px;
`
const ContactItem=styled.div`
margin-bottom: 10px;
display: flex;
align-items: cenyter;
`

const Footer = () => {
  return (
    <Container>

      <Left>
        <Logo>SHOPLINE</Logo>
        <Desc>Lorem ipsum dolor sit amet. Qui voluptas ipsa in velit autem aut consectetur libero est error consectetur et fuga enim sed necessitatibus nostrum. </Desc>
        <SocialContainer>
        <a  href="https://www.linkedin.com/in/tarab-mojiz/">
            <SocialIcon  color="#3B71CA">
                <LinkedInIcon/>
          </SocialIcon></a>
          <a  href="https://github.com/tarab7">
            <SocialIcon color="#332D2D">
                <GitHubIcon/>
            </SocialIcon></a>
            <a  href="https://leetcode.com/Tarab_Mojiz/">
            <SocialIcon color="#f57f17">
                <CodeIcon/>
            </SocialIcon>
            </a>
        </SocialContainer>
      </Left>

      <Center>
        <Title>
            Useful Links
        </Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem><RoomIcon style={{"marginRight":"10px"}}/>
        Lorem ipsum dolor sit amet. Qui voluptas ipsa in velit autem aut consectetur.
        </ContactItem>
        <ContactItem><PhoneIcon style={{"marginRight":"10px"}}/>
            +1 234 567 89
        </ContactItem>
        <ContactItem>

        </ContactItem>
        <ContactItem><EmailIcon style={{"marginRight":"10px"}}/>
            tarabnaqvi766@gmail.com
        </ContactItem>
      </Right>

    </Container>
  )
}

export default Footer
