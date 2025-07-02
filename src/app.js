import express from "express";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

import { healthCheckRouter } from "./controllers/healthcheck.controllers";


app.use("/api/v1/healthcheck", healthCheckRouter)

export default app ;
