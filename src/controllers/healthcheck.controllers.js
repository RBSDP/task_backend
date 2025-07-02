import {ApiResponse} from "../utils/api-responce.js"



const healthCheckController = (req, res) =>{

    res.status(200).json(new ApiResponse(200, {message : "server is running"}))
    
    
}


export {healthCheckController}