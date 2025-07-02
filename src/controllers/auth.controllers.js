
// import {asyncHandler} from '../utils/async-handler.js'

// import { User } from '../models/user.models.js'
// import {ApiError} from '../utils/api-error.js'
// import {ApiResponse} from "../utils/api-responce.js"
// const registerUser = asyncHandler(async(req,res) => {


//     const {email,password, username,role, fullname} = req.body

    
//     // checking user id db
//     // try {
//     //     const existinguser = await User.findOne({email})
//     //     if(existinguser){
//     //         throw new ApiError(422, "user already exists")
//     //     }
//     // }catch{
//     //     throw new ApiError(400, "error connecting to DB")
//     // }
//     try {
//     const existinguser = await User.findOne({ email });
//     if (existinguser) {
//         throw new ApiError(422, "User already exists");
//     }
// } catch {
//     throw new ApiError(400, "error connecting to DB");
// }


   
//     //creating the user is db

    
//     const user = await User.create({
//         email,password,username,fullname
//     })

//     const createdUser = await User.findById(user._id).select("-password -refreshToken")


//     if(!createdUser) {
//         throw new ApiError(400, "erro while creattin user")
//     }

//     res.status(201).json(

//         new ApiResponse(201,createdUser, "user registered successfully")
//     )



//     //sending a email to the user 


// })

// export {registerUser}


import { asyncHandler } from '../utils/async-handler.js';
import { User } from '../models/user.models.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from "../utils/api-responce.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, username, role, fullname } = req.body;

    // Check if user already exists
    let existinguser;
    try {
        existinguser = await User.findOne({ email });
    } catch (error) {
        throw new ApiError(500, "Error connecting to the database");
    }

    if (existinguser) {
        throw new ApiError(422, "User already exists");
    }

    // Create new user
    const user = await User.create({
        email,
        password,
        username,
        fullname,
        role
    });

    // Fetch created user without password and refreshToken
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(400, "Error while creating user");
    }

    res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );

    // TODO: Send email (future enhancement)
});

export { registerUser };
