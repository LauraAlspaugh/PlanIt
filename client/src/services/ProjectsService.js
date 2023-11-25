import { AppState } from "../AppState.js"
import { Project } from "../models/Project.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService{
    async getProjects(){
        const res = await api.get('api/projects')
        logger.log('getting projects!', res.data)
        const newProjects = res.data.map(pojo => new Project(pojo))
    AppState.myProjects = newProjects
        }
        async createProject(projectData) {
            const res = await api.post('api/projects', projectData)
            logger.log('CREATED PROJECT', res.data)
            const newProject = new Project(res.data)
            AppState.myProjects.push(newProject)
            return newProject
        }
        async getProjectById(projectId){
            // 
            const res = await api.get(`api/projects/${projectId}`)
    logger.log('GOT PROJECT', res.data)
    const newProject = new Project(res.data)
    AppState.activeProject = newProject
            
            }
            async destroyProject(projectId){
                const res = await api.delete(`api/projects/${projectId}`)
                logger.log('destroying project', res.data)
                AppState.activeProject = null
                const projectIndex = AppState.myProjects.findIndex(project => project.id == projectId)
            if (projectIndex == -1) { throw new Error(`No project found with the id of ${projectId}`) }
            AppState.myProjects.splice(projectIndex, 1)


            }
            clearAppState() {
                AppState.activeProject = null
                AppState.notes.length = 0
                AppState.sprints.length = 0
                AppState.tasks.length = 0
            }
}

export const projectsService = new ProjectsService()