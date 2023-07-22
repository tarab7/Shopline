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

const Signup = () => {
    const [name, setName] = useState("");
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

    const setUser=async ()=>{
        console.log(name+" "+email+" "+password);
        
        let result=await fetch(`${BASE_URL}/signup`,{
            method:'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        } )
        result=await result.json();
        const userId=result.result._id;

        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        
        if(result)
        {
            navigate("/");
        }
    }

    return (
        <div className="signup">
            <div className="card" style={{ "width": "25rem", "height": "25rem" }}>
                <div className="card-body">

                    <div className="inside_card">
                    <div class="input-group mb-3 "></div>

                        <h2>Sign Up</h2>

                        <div class="input-group mb-3 "></div>

                        <div class="input-group mb-3">
                            <input type="text" placeholder="Full Name"  className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <input type="text" placeholder="Email"  className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" placeholder="Password"  className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3 "></div>

                        <div class="input-group mb-3">
                            <Button onClick={setUser}>Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;