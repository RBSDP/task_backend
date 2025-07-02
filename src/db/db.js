import mongoose from "mongoose";

const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => console.log(process.env.MONGO_URL,"DB connection done"))
        
    } catch (error) {
        console.log("mongo db not connected", error);
        process.exit(1)
        
    }


}

export default connectDB;
// import mongoose from "mongoose";

// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => {
//         console.error("MongoDB connection error:", err);
//         process.exit(1);
//     });
