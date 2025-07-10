import { asyncHandler } from "../utils/async-handler";

import { Project } from "../models/project.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-responce";

const createProject = asyncHandler(async (req , res) =>{
    try {
        const {title, description} = req.body;
        const createdBy = req.user._id

        const project = new Project({
        title,description,createdBy
        })

        await project.save()
        res.status(200).json(

            ApiResponse(200,{},"project created successfully")
        )
    } catch (error) {
        throw new ApiError(400, "error creating and saving project")
    }
    
})


const deleteProject = asyncHandler(async (req,res) => {

    try {
        const projectId = req.params.id
        const project = await Project.findById(projectId)

        if(project.createdBy.toString === req.user._id){
            await Project.findByIdAndDelete(projectId)
            res.ApiResponse(200,{},"Project deletion successfull")
        }

        
    } catch (error) {
        throw new ApiError(400, "error occured while deleting the project")
    }



})

const updateProject = asyncHandler(async (req,res) => {
    try {
        const {title, description} = req.body ;
        const updateReqUser = req.user._id
        const projectId = req.params.id
        const project = await Project.findById(projectId)

        if(project.createdBy.toString() === updateReqUser){
            await Project.findByIdAndUpdate(projectId,{title, description},{new :true},{runValidators : true})
        }
    } catch (error) {
        throw ApiError(400, "Error updating the task")
    }
})

export {createProject, deleteProject, updateProject}