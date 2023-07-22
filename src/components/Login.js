import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "../helper";

const Button=styled.button`
    width: 20rem;
    height:40px;
    background-color: teal;
    color : white;
    border-radius: 2px;
    border: none;
    margin: 0px 20px;
`

const Login=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const navigate=useNavigate();

    useEffect(()=>{
        const user=localStorage.getItem('user');
        if(user)
        {
            navigate("/");
        }
    })

    const getUser=async()=>{
        let result=await fetch(`${BASE_URL}/login`,{
            method:'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        });
        result=await result.json();

        if(result.auth)
        {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }
        else
        {
            alert("Please Enter correct Email or Password");
        }
    }

    return(
        <div className="signup">
            <div className="card mt-5" style={{ "width": "25rem", "height": "20rem" }}>
                <div className="card-body">

                    <div className="inside_card">

                    <div class="input-group mb-3 "></div>
                        <h2>Log In</h2>

                        <div class="input-group mb-3 "></div>

                        <div class="input-group mb-3">
                            <input type="text" placeholder="Email"  className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" placeholder="Password"  className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3 "></div>

                        <div class="input-group mb-3">
                            <Button onClick={getUser}>Log In</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;