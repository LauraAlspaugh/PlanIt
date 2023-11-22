import BaseController from "../utils/BaseController.js";

export class TasksController extends BaseController {
    constructor() {
        super('api/tasks')
        this.router
    }
}