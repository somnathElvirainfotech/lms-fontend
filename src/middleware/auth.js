import {useState,createContext, useContext } from "react";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(null);

    const login=(token)=>{
        setToken(token)
    }
return <AuthContext.Provider value={{token,login}}>
    {children}
</AuthContext.Provider>
}

export const useAuth=()=>{
    return useContext(AuthContext)
}