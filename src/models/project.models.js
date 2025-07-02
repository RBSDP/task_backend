import mongoose, { Schema } from "mongoose";
import { User } from "./user.models";

const projectSchema = new Schema({

    title : {
        type : String,
        required : true,
        trim : true
    },
    description :{
        type : String  
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref:User,
        required : true

    }

}, {timestamps : true})


export const Project = mongoose.model("Project", projectSchema)


