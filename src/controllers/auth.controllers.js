import { body } from 'express-validator'
import {asyncHandler} from '../utils/async-handler.js'
import { userRegistrationValidator } from '../validators/index.js'

const registerUser = asyncHandler(async(req,res) => {


    const {email,password, username,role} = req.body

    // valoidation
    userRegistrationValidator(body)
})

export {registerUser}