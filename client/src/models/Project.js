export class Project{
    constructor(data){
        this.id = data.id || data._id
        this.name = data.name
        this.description = data.description
        this.createdAt = new Date(data.createdAt).toLocaleTimeString()
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
        this.creatorId = data.creatorId
        this.creator = data.creator
    }
}
// const projectData = 
// {
//     "_id": "655d7f6272e87058e6f37a5f",
//     "name": "Mesozoic Kingdom",
//     "description": "A Park like no other any *where* or *when* you go.",
//     "creatorId": "652ef49aff9881f8395eb350",
//     "createdAt": "2023-11-22T04:11:14.436Z",
//     "updatedAt": "2023-11-22T04:11:14.436Z",
//     "__v": 0,
//     "creator": {
//         "_id": "652ef49aff9881f8395eb350",
//         "email": "lauraalspaugh2002@icloud.com",
//         "name": "lauraalspaugh2002",
//         "picture": "https://s.gravatar.com/avatar/adb1a81448fd211a1c2107bc4dbd9772?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fla.png",
//         "id": "652ef49aff9881f8395eb350"
//     },
//     "id": "655d7f6272e87058e6f37a5f"
// }