export class Task{
    constructor(data){
        this.id = data.id || data._id
        this.weight = data.weight
        this.name = data.name 
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
        this.projectId = data.projectId
        this.sprintId = data.sprintId
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.isComplete = data.isComplete
        this.completeOn = data.completeOn ? new Date(data.completeOn) : null 
    }
}