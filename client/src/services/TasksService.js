import { AppState } from "../AppState.js"
import { Task } from "../models/Task.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TasksService{
    async createTask(taskData) {
        const res = await api.post('api/tasks', taskData)
        logger.log('Creating task!', res.data)
        const newTask = new Task(res.data)
        AppState.tasks.push(newTask)
    }
}

 export const tasksService = new TasksService()