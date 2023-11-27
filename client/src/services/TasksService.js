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
    async updateTaskStatus(taskData){
const res = await api.put(`api/tasks/${taskData}`)
logger.log('updating this task!')
const newTask = new Task(res.data)
AppState.activeTask = newTask
const taskIndex = AppState.tasks.findIndex(task => task.id == newTask.id)
    if (taskIndex == -1) { throw new Error('no task for this id') }
    AppState.tasks.splice(taskIndex, 1, newTask)
    }
    changeEditStatus(wantsToEdit) {
        AppState.isEditingTask = wantsToEdit
    }
    async getTasksByProjectId(projectId){
        const res = await api.get(`api/projects/${projectId}/tasks`)
        logger.log('getting tasks', res.data)
        const newTasks = res.data.map(pojo => new Task(pojo))
        AppState.tasks = newTasks
    }
    async editTask(taskData){
        const res = await api.put(`api/tasks/${taskData.id}`, taskData)
        logger.log('updating task!', res.data)
        const newTask = new Task(res.data)
        AppState.setActiveTask = newTask
        const taskIndex = AppState.tasks.findIndex(task => task.id == newTask.id)
        if(taskIndex == -1){
            throw new Error('no task with this id')
        }AppState.tasks.splice(taskIndex, 1, newTask)

    }
}

export const tasksService = new TasksService()