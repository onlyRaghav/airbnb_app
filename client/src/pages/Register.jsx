import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate= useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            // 1.send user info to the server
            const response= await api.post('/api/auth/register',{
                name,
                email,
                password
            })
            // 2.extract token from response
            const {token}= response.data;
            // 3.set token in localStorage
            localStorage.setItem("token",token);

            navigate('/dashboard');

        }catch(err){
            console.log("Register failed:",err);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className=" bg-gray-200 w-96 p-8 flex flex-col align-center">
                <h2 className="mb-8 text-red-500 text-2xl">Register</h2>
                <input className="p-1 border border-gray-400 text-black mb-3 rounded" type="text" placeholder="John" value={name} onChange={(e)=>setName(e.currentTarget.value)}  required/>
                <input className="p-1 border border-gray-400 text-black mb-3 rounded" type="text" placeholder="John@example.com" value={email} onChange={(e)=>setEmail(e.currentTarget.value)} required />
                <input className="p-1 border border-gray-400 text-black mb-3 rounded" type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)} required />
                <button className="text-white bg-red-500 p-2 w-full text-center rounded" type="submit">Register</button>
            </form>
        </div>
    )

}
export default Register;