import {useState, UseEffect, useEffect} from "react"

export const useAuth = ()=>{
    const [token,setToken]=useState(null);

    useEffect(()=>{
        const storedToken= localStorage.getItem("token");
        if(storedToken) setToken(storedToken);
    },[])

    const login= (jwt)=>{
        localStorage.setItem("token",jwt);
        setToken(jwt);
    }
    const logout= ()=>{
        localStorage.removeItem("token");
        setToken(null);
    }
    return({
        token,
        login,
        logout,
        isAuthenticated: !!token
    })
}