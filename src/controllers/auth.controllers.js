import { body } from 'express-validator'
import {asyncHandler} from '../utils/async-handler.js'
import { userRegistrationValidator } from '../validators/index.js'
import { User } from '../models/user.models.js'

const registerUser = asyncHandler(async(req,res) => {


    const {email,password, username,role} = req.body

    // validation
    userRegistrationValidator(body)

    //creating the user is db

    
    const user = await User.create({
        email,password,username
    })

    if(!user){
        res.status(400).json({
            "message" : "unable to send message"
        })
    }



})

export {registerUser}