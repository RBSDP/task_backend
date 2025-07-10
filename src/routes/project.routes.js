import { Router } from "express";



import { createProject,deleteProject,updateProject } from "../controllers/project.controllers";

const router = Router();

router.route('/createProject').post(createProject)
router.route('/deleteProject/:id').delete(deleteProject)
router.route('/updateProject/:id').put(updateProject)


export default router