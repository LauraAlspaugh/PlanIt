export class Note{
    constructor(data){
        this.id = data.id || data._id
        this.name = data.name 
this.body = data.body
this.creator = data.creator 
this.creatorId = data.creatorId
this.taskId = data.taskId
this.projectId = data.projectId
this.createdAt = new Date(data.createdAt).toLocaleDateString()
this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
    }
}