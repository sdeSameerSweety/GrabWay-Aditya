import Cookies from "js-cookie";
import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const UserContext=createContext({});
export function UserContextProvider({children}){
    const [userEmail,setUserEmail]=useState(null);
    useEffect(()=>{
        const email=Cookies.get('grabwayToken');
        if(email){
            axios.get('/checkuser',{email}).then((res)=>{
                const temp=res.data;
                setUserEmail(temp.email);
            })
        }
    },[userEmail])


    return(
        <UserContext.Provider value = {{userEmail,setUserEmail}}>
        {children}
        </UserContext.Provider>
    )
}
