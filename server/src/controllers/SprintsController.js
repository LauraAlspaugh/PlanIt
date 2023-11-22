import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { sprintsService } from "../services/SprintsService.js";

export class SprintsController extends BaseController {
    constructor() {
        super('api/sprints')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createSprint)
            .delete('/:sprintId', this.destroySprint)
    }
    async destroySprint(request, response, next) {
        try {
            const sprintId = request.params.sprintId
            const userId = request.userInfo.id
            const sprint = await sprintsService.destroySprint(sprintId, userId)
            return response.send(sprint)
        } catch (error) {
            next(error)

        }
    }
    async createSprint(request, response, next) {
        try {
            const sprintData = request.body
            sprintData.creatorId = request.userInfo.id
            const sprint = await sprintsService.createSprint(sprintData)
            return response.send(sprint)
        } catch (error) {
            next(error)

        }
    }
}