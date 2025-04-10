import { Router } from "express";

import {registerUser  } from "../controllers/auth.controllers"

import {userRegistrationValidator} from "../validators/index.js"
import {validate} from "../middlewares/validator.middleware.js"
const router  = Router()


router.route('/register').get(userRegistrationValidator(), validate, registerUser)

export default router

// topic : factory pattern learn