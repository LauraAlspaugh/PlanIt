import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { projectsService } from "../services/ProjectsService.js";
import { sprintsService } from "../services/SprintsService.js";
import { tasksService } from "../services/TasksService.js";
import { notesService } from "../services/NotesService.js";
import { response } from "express";

export class ProjectsController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getProjects)
            .get('/:projectId', this.getProjectById)
            .get('/:projectId/sprints', this.getSprintsByProjectId)
            .get('/:projectId/tasks', this.getTasksByProjectId)
            .get('/:projectId/notes', this.getNotesByProjectId)
            .post('', this.createProject)
            .delete('/:projectId', this.destroyProject)
    }
    async getNotesByProjectId(request, response, next) {
        try {
            const projectId = request.params.projectId
            const notes = await notesService.getNotesByProjectId(projectId)
            return response.send(notes)
        } catch (error) {
            next(error)

        }
    }
    async getTasksByProjectId(request, response, next) {
        try {
            const projectId = request.params.projectId
            const tasks = await tasksService.getTasksByProjectId(projectId)
            return response.send(tasks)
        } catch (error) {
            next(error)

        }
    }
    async getSprintsByProjectId(request, response, next) {
        try {
            const projectId = request.params.projectId
            const sprints = await sprintsService.getSprintsByProjectId(projectId)
            return response.send(sprints)
        } catch (error) {
            next(error)

        }
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
            const userId = request.userInfo.id
            const project = await projectsService.getProjectById(projectId, userId)
            return response.send(project)
        } catch (error) {
            next(error)
        }
    }
    async getProjects(request, response, next) {
        try {
            const userId = request.userInfo.id
            const projects = await projectsService.getProjects(userId)
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