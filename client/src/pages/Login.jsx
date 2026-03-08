import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../services/api.js"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1.Request server for authentication
            const response = await Api.post('/api/auth/login', {
                email,
                password
            })
            // 2.Extract token from response obj
            const { token } = response.data;
            // 3.Store token in browser
            localStorage.setItem("token", token);
            // 4.navigate to dashboard
            navigate("/dashboard");

        } catch (error) {
            setError("Invalid Credentials");
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-8 rounded shadow-md w-96 flex flex-col justify-around align-center" onSubmit={handleSubmit}>
                <h2 className=" text-blue-600 text-3xl mb-6 text-center font-bold">Login</h2>
                {error &&
                    <p className=" text-red-500 my-2">{error}</p>}
                <input className=" w-full p-1 mb-3 text-gray-500 border-2 border-gray-400 rounded text-g" type="text" placeholder="johndoe@example.com" onChange={e => { setEmail(e.target.value) }} value={email} required />
                <input className=" w-full p-1 mb-2 text-gray-500 border-2 border-gray-400 rounded " type="password" placeholder="password" onChange={e => { setPassword(e.target.value) }} value={password} required />
                <button type="submit" className="w-full text-amber-50 mt-5 bg-blue-600 text-center py-2 text-2xl cursor-pointer rounded">login</button>
                <p className=" text-gray-400 mt-4 text-center">New User? <a onClick={() => { navigate('/register') }} className="text-red-400 underline cursor-pointer">Register.</a></p>
            </form>
        </div>
    )
}
export default Login;