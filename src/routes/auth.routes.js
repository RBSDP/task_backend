import { Router } from "express";

import {registerUser,loginUser, logoutUser,getUser, refreshAccessToken} from "../controllers/auth.controllers.js"

import {userRegistrationValidator} from "../validators/index.js"
import {validate} from "../middlewares/validator.middleware.js"
const router  = Router()

// userRegistrationValidator(), validate,
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/getuser').get(getUser);
router.route('/refreshAccessToken').get(refreshAccessToken);


export default router

// topic : factory pattern learn