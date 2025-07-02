// index files imports all the files needed to start the project
// it starts the server

import app from "./app.js";

import dotenv from "dotenv";
import connectDB from "./db/db.js"
dotenv.config({
    path : './.env'
}) ;

const PORT = process.env.PORT || 8000 ;

connectDB()
.then(
    () => {
        app.listen(PORT, () => console.log(`server is running on port :${PORT}`))
    }
)
.catch(
    (err) => {
        console.error("mpngodb connection error");
        process.exit(1)
    }
)



