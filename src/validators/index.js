import {body} from "express-validator"

const userRegistrationValidator = () => {
    return [
        
        
        
        body('email').trim().notEmpty.withMessage("Email is required").isEmail().withMessage("Email is invalid"),
        body('username').trim().notEmpty().withMessage("username is required")
        .isLength({min:3}).withMessage("username should be max 13 charactures")
        .isLength({max:13}).withMessage("username should be max 13 charactures")

    
    
    
    
    
    ]
}

const userLoginValidator = () =>{

    return [

        body('email').isEmail().withMessage("email is not valid"),
        body('password').notEmpty().withMessage("password is required")






    ]




}

export {userRegistrationValidator,userLoginValidator}