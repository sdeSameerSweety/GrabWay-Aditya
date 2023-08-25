import Cookies from "js-cookie";
import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const UserContext=createContext({});
export function UserContextProvider({children}){
    const [userEmail,setUserEmail]=useState('');
    useEffect(()=>{
        const email=Cookies.get('grabwayToken');
        if(email){
            axios.post('/checkuser',{email}).then((res)=>{
                console.log(res.data);
                //res===null means first time login.
            })
        }
    },[userEmail])


    return(
        <UserContext.Provider value = {{userEmail,setUserEmail}}>
        {children}
        </UserContext.Provider>
    )
}
