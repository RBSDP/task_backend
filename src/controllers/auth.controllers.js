
import {asyncHandler} from '../utils/async-handler.js'

import { User } from '../models/user.models.js'

const registerUser = asyncHandler(async(req,res) => {


    const {email,password, username,role} = req.body

    
    //checking user id db
    try {
        const existinguser = await User.findOne({email})
        if(existinguser){
            throw new ApiError(422, "user already exists")
        }
    }



    //creating the user is db

    
    const user = await User.create({
        email,password,username
    })

    if(!user){
        res.status(400).json({
            "message" : "unable to send message"
        })
    }

    //sending a email to the user 


})

export {registerUser}