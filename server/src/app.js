import express from "express";
import CORS from 'cors';
import HealthRouter from "./routes/health.routes.js";

const app = express();

app.use(CORS({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());

app.use('/api/health', HealthRouter);

app.use((req,res)=>{
    res.status(404).json({message:"request out reach"});
})

export default app;
