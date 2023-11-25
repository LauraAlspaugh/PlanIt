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
    
    setActiveTask(task) {
        AppState.activeTask = task
    }
    async destroyTask(taskId){
const res = await api.delete(`api/tasks/${taskId}`)
logger.log('destroying task', res.data)
const taskIndex = AppState.tasks.findIndex(task => task.id == taskId)
    if (taskIndex == -1) { throw new Error('No task found with this id') }
    AppState.tasks.splice(taskIndex, 1)
    }
}

 export const tasksService = new TasksService()