import jwt from "jsonwebtoken"
import { ApiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";

const authenticate = asyncHandler ((req,_,next) =>{

    const incomingAccessToken = req.cookies.accessToken 
    if(!incomingAccessToken){
        throw new ApiError(401, "access token is missing")
    }
    
    let decoded;

    try {
        decoded = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        throw new ApiError(401, "access token is invalid")
    }
    

})


export {authenticate};


