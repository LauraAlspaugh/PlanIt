import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class SprintsService {
    async destroySprint(sprintId, userId) {
        const sprint = await dbContext.Sprints.findById(sprintId)
        if (!sprint) {
            return new BadRequest('this is not a valid sprint id')
        }
        if (sprint.creatorId.toString() != userId) {
            throw new Forbidden('Not your sprint to destroy!')
        } await sprint.delete()
        return "sprint has been deleted!"
    }
    async getSprintsByProjectId(projectId) {
        const sprints = await dbContext.Sprints.find({ projectId: projectId })
            .populate('creator', 'name picture email ')
        return sprints
    }
    async createSprint(sprintData) {
        const sprint = await dbContext.Sprints.create(sprintData)
        await sprint.populate('creator', 'name email picture')
        return sprint
    }

}

export const sprintsService = new SprintsService()