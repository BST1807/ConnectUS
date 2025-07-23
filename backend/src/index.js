import express from "express";
import {app,server} from "./lib/socket.js"
const port = 3000
const _dirname=path.resolve();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
app.use(cookieParser());
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,

}))
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(_dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname,"../frontend","dist","index.html"));
  })
}

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB();
})
