import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tasksService } from "../services/TasksService.js";

export class TasksController extends BaseController {
    constructor() {
        super('api/tasks')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTask)
            .put('/:taskId', this.editTask)
            .delete('/:taskId', this.destroyTask)
    }
    async destroyTask(request, response, next) {
        try {
            const taskId = request.params.taskId
            const userId = request.userInfo.id
            const task = await tasksService.destroyTask(taskId, userId)
            return response.send(task)
        } catch (error) {
            next(error)

        }
    }
    async editTask(request, response, next) {
        try {
            const taskId = request.params.taskId
            const userId = request.userInfo.id
            const taskData = request.body
            const updatedTask = await tasksService.editTask(taskId, userId, taskData)
            return response.send(updatedTask)
        } catch (error) {
            next(error)

        }
    }
    async createTask(request, response, next) {
        try {
            const taskData = request.body
            taskData.creatorId = request.userInfo.id
            const task = await tasksService.createTask(taskData)
            return response.send(task)
        } catch (error) {
            next(error)

        }
    }
}