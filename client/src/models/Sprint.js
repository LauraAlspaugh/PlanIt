export class Sprint{
    constructor(data){
        this.id = data.id || data._id
        this.name = data.name
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
        this.projectId = data.projectId
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.isOpen = data.isOpen

    }
}