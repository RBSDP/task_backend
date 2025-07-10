import express from "express";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

import  healthCheckRouter  from "./routes/healthcheck.routes.js";
import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import cookieParser from "cookie-parser";

app.use(cookieParser())
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/project", projectRoutes)
app.get('/',(req,res) => {
    res.send("server is runnig")
})

export default app ;
