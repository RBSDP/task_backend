
import {asyncHandler} from '../utils/async-handler.js'

import { User } from '../models/user.models.js'
import {ApiError} from '../utils/api-error.js'
import {ApiResponse} from "../utils/api-responce.js"
const registerUser = asyncHandler(async(req,res) => {


    const {email,password, username,role} = req.body

    
    // checking user id db
    try {
        const existinguser = await User.findOne({email})
        if(existinguser){
            throw new ApiError(422, "user already exists")
        }
    }catch{
        throw new ApiError(400, "error connecting to DB")
    }

   
    //creating the user is db

    
    const user = await User.create({
        email,password,username
    })

    const createdUser = await User.findById(user._id).select("-password", "- refreshToken")

    if(!createdUser) {
        throw new ApiError(400, "erro while creattin user")
    }

    res.status(201).json(

        new ApiResponse(201,createdUser, "user registered successfully")
    )



    //sending a email to the user 


})

export {registerUser}