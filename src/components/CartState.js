import React, { useState } from "react";
import cartContext from "./cartContext";

const CartState=(props)=>{
    const s1={
        "cart":0
    }

    const [state, setState]=useState(s1);

    const update=()=>{
        setState((prev)=>({
            "cart": prev.cart+1
        }))
        console.log(state.cart)
    }

    return (
        <cartContext.Provider value={{state, update}}>
            {props.children}
        </cartContext.Provider>
    )
}

export default CartState;