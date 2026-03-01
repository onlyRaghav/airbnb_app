import { useEffect, useState } from "react";
import api from "../services/api.js"
export default function Home() {
    const [status, setStatus] = useState("");
    const [error, setError] = useState(null);
    useEffect(() => {
        const HealthCheck = async () => {
            try {
                const response = await api.get('/api/health');
                setStatus(response.data.status);
            } catch (err) {
                setError(`Backend not reachable. ${err}`);
            }
        }
        HealthCheck();
    }, [])
    return (
        <div className="border flex-1 w-full flex justify-center items-center flex-col">
            <p className=" justify-self-start">Home Page</p>
            {status.length != 0 ? <p className=" bg-green-600 my-3 w-25 text-center">{status}</p> : null}
            {error && <p className=" bg-red-600 my-3 w-25 text-center ">{error}</p>}
        </div>
    )
}