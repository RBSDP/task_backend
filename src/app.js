import express from "express";

const app = express();

import { healthCheckRouter } from "./controllers/healthcheck.controllers";


app.use("/api/v1/healthcheck", healthCheckRouter)

export default app ;
