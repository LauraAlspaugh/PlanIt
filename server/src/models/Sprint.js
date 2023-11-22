import { Schema } from "mongoose";

export const SprintSchema = new Schema({
    name: { type: String, required: true, maxLength: 300 },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    isOpen: { type: Boolean, required: false, default: true }
},
    { timestamps: true, toJSON: { virtuals: true } }
)
SprintSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
// SprintSchema.virtual('project', {
//     localField: 'projectId',
//     foreignField: '_id',
//     justOne: true,
//     ref: 'Project'
// })