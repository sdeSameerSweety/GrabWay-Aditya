
import { createContext, useEffect } from "react";
import { useState } from "react";
export const UserContext=createContext({});
export function UserContextProvider({children}){
    function checkToken(){
        
    }
    return(
        <UserContext.Provider value = {{}}>
        {children}
        </UserContext.Provider>
    )
}
