import React, { useEffect, useState } from "react";
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

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const setUser=async ()=>{
        console.log(name+" "+email+" "+msg);
        
        let result=await fetch(`${BASE_URL}/addMsg`,{
            method:'post',
            body: JSON.stringify({name, email, msg}),
            headers: {
                'Content-Type':'application/json'
            }
        } )
        result=await result.json();
        
        if(result)
        {
            setName("");
            setEmail("");
            setMsg("");
            alert("Message Sent!")
        }
    }

    return (
        <div className="signup">
            <div className="card" style={{ "width": "25rem", "height": "25rem" }}>
                <div className="card-body">

                    <div className="inside_card">
                    <div class="input-group mb-3 "></div>

                        <h2>Contact Us</h2>

                        <div class="input-group mb-3 "></div>

                        <div class="input-group mb-3">
                            <input type="text" placeholder="Full Name"  className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <input type="text" placeholder="Email"  className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <textarea type="text" placeholder="Type your message..."  class="form-control" id="exampleFormControlTextarea1" rows="3" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3 "></div>

                        <div class="input-group mb-3">
                            <Button onClick={setUser}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;