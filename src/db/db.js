import mongoose from "mongoose";

const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo db connected")
    } catch (error) {
        console.log("mongo db not connected", error);
        process.exit(1)
        
    }


}

export default connectDB;
