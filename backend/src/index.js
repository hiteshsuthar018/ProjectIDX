import express from "express";
import cors from "cors";
import { PORT } from "./config/envConfig.js";
import apiRouter from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({  origin: "*",}));

app.use('/api',apiRouter)

app.get("/ping",(req,res)=>{
    return res.json({mes:"pong"})
})

app.listen(PORT,()=>{
    console.log(`Server started on port :${PORT}`)
})
