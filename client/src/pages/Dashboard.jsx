import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard= ()=>{
    const [user,setUser]= useState("");

    useEffect(()=>{
        const fetchUser= async ()=>{
            const response = await api.get('/api/auth/me');
            setUser(response.data.user);
        }
        fetchUser();
    },[]);
    return(
        <div>
            <h1>Dashboard</h1>
            {user && <p>{`Welcome ${user.name}`}</p>}
        </div>
    )
}

export default Dashboard;