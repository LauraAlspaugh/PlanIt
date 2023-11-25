import { query } from "express"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class ProjectsService {
    async destroyProject(projectId, userId) {
        const project = await this.getProjectById(projectId)
        if (project.creatorId.toString() != userId) {
            throw new Forbidden('Not your project to destroy!')
        } await project.delete()
        return "project has been deleted!"
    }
    async getProjectById(projectId, userId) {
        const project = (await dbContext.Projects.findById(projectId)).populate('creator', 'name picture email ')
        if (!project) {
            throw new BadRequest('This is not a valid project id')
        }
        return project
    }
    async getProjects(userId) {
        const projects = await dbContext.Projects.find({ creatorId: userId }).populate('creator', 'name picture email')
        return projects
    }
    async createProject(projectData) {
        const project = await dbContext.Projects.create(projectData)
        await project.populate('creator', 'name picture email')
        return project
    }

}

export const projectsService = new ProjectsService()