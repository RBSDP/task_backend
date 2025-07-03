
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




const loginUser = asyncHandler(async (req, res) => {

    
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400,"email and password required")

    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"error connecting DB")
    }

    const isMatch =  user.isPasswordCorrect()
    if(!isMatch){
        throw new ApiError(400,"password is incorrect")
    }

    const accessToken = user.generateAccessToken()

    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    const loggedUser = await User.findById(user._id).select('-password -refreshToken')

    const cookieOptions = {
            httpOnly : true,
            secure : true,
            maxAge : 24*60*60*1000

    }

    res.status(200).cookie("accessToken",accessToken,cookieOptions).cookie("refreshToken",refreshToken,cookieOptions).json(

        new ApiResponse(200,{user:loggedUser,refreshToken,accessToken})
    )

})


const logoutUser = asyncHandler(async(req,res) => { 

    await User.findByIdAndUpdate(req.user._id,{
        $unset : {refreshToken : ""}
    },{
        new:true, validateBeforeSave : false
    })


    const cookieOptions = { 
        httpOnly : true,
        secure : true
    }

    res.status(200).clearCookie("refreshToken",cookieOptions).clearCookie('accessToken',cookieOptions).json(new ApiResponse(200, {},"userloggged out successfully" ))

})

const getUser = asyncHandler(async (req,res) => {

    return res.status(200).json(new ApiResponse(200,req.user, "data sent successfully"))

})
export { registerUser , loginUser , logoutUser, getUser};

 