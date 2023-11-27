import { AppState } from "../AppState.js"
import { Sprint } from "../models/Sprint.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SprintsService{
async getSprintsByProjectId(projectId){
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log('getting sprints', res.data)
    const newSprint = res.data.map(pojo => new Sprint(pojo))
    AppState.sprints = newSprint
}
async createSprint(sprintData){
const res = await api.post('api/sprints', sprintData)
logger.log('creating sprint!')
const newSprint = new Sprint(res.data)
AppState.sprints.push(newSprint)
}
setActiveSprint(sprint) {
    AppState.activeSprint = sprint
}
async destroySprint(sprintId){
    const res = await api.delete(`api/sprints/${sprintId}`)
logger.log('destroying sprint', res.data)
const sprintIndex = AppState.sprints.findIndex(sprint => sprint.id == sprintId)
    if (sprintIndex == -1) { throw new Error('No sprint found with this id') }
    AppState.sprints.splice(sprintIndex, 1)
}
}

export const sprintsService = new SprintsService()