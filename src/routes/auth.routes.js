import { Router } from "express";

import {registerUser} from "../controllers/auth.controllers.js"

import {userRegistrationValidator} from "../validators/index.js"
import {validate} from "../middlewares/validator.middleware.js"
const router  = Router()

// userRegistrationValidator(), validate,
router.route('/register').post(registerUser)

export default router

// topic : factory pattern learn