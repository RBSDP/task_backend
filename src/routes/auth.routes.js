import { Router } from "express";

import {registerUser,loginUser, logoutUser,getUser} from "../controllers/auth.controllers.js"

import {userRegistrationValidator} from "../validators/index.js"
import {validate} from "../middlewares/validator.middleware.js"
const router  = Router()

// userRegistrationValidator(), validate,
router.route('/register').post(registerUser);
router.route('/login').get(loginUser);
router.route('/logout').get(logoutUser);
router.route('/getuser').get(getUser);


export default router

// topic : factory pattern learn