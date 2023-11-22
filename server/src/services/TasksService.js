import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TasksService {
    async destroyTask(taskId, userId) {
        const task = await dbContext.Tasks.findById(taskId)
        if (!task) {
            return new BadRequest('this is not a valid task id')
        }
        if (task.creatorId.toString() != userId) {
            throw new Forbidden('Not your task to destroy!')
        } await task.delete()
        return " this task has been deleted!"
    }
    async editTask(taskId, userId, taskData) {
        const taskToBeUpdated = await dbContext.Tasks.findById(taskId)
        if (taskToBeUpdated.creatorId.toString() != userId) {

            throw new BadRequest('Do not even try it! ')
        }
        if (!taskToBeUpdated) {
            throw new BadRequest('not a valid task to be updated')
        }
        if (taskToBeUpdated.isComplete == true) {
            throw new BadRequest('this is not a valid id')
        }
        taskToBeUpdated.name = taskData.name || taskToBeUpdated.name
        taskToBeUpdated.weight = taskData.weight || taskToBeUpdated.weight
        taskToBeUpdated.sprintId = taskData.sprintId || taskToBeUpdated.sprintId
        taskToBeUpdated.isComplete = taskData.isComplete != undefined ? taskData.isComplete : taskToBeUpdated.isComplete

        if (taskToBeUpdated.isComplete && !taskToBeUpdated.completedOn) {
            taskToBeUpdated.completedOn = new Date()
        }
        else {
            taskToBeUpdated.completedOn = null
        }
        await taskToBeUpdated.save()
        return taskToBeUpdated
    }
    async getTasksByProjectId(projectId) {
        const tasks = await dbContext.Tasks.find({ projectId: projectId })
            .populate('creator', 'name picture email ')
        return tasks
    }
    async createTask(taskData) {
        const task = await dbContext.Tasks.create(taskData)
        await task.populate('creator', 'name picture email')
        return task
    }

}

export const tasksService = new TasksService()