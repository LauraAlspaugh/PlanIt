import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { projectsService } from "../services/ProjectsService.js";

export class ProjectsController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
            .get('', this.getProjects)
            .get('/:projectId', this.getProjectById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createProject)
            .delete('/:projectId', this.destroyProject)
    }
    async destroyProject(request, response, next) {
        try {
            const projectId = request.params.projectId
            const userId = request.userInfo.id
            const project = await projectsService.destroyProject(projectId, userId)
            return response.send(project)
        } catch (error) {
            next(error)

        }
    }
    async getProjectById(request, response, next) {
        try {
            const projectId = request.params.projectId
            const project = await projectsService.getProjectById(projectId)
            return response.send(project)
        } catch (error) {
            next(error)
        }
    }
    async getProjects(request, response, next) {
        try {

            const projects = await projectsService.getProjects()
            return response.send(projects)
        } catch (error) {
            next(error)

        }
    }
    async createProject(request, response, next) {
        try {
            const projectData = request.body
            const userId = request.userInfo.id
            projectData.creatorId = userId
            const project = await projectsService.createProject(projectData)
            return response.send(project)
        } catch (error) {
            next(error)

        }
    }
}