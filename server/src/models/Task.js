import { Schema } from "mongoose";

export const TaskSchema = new Schema({
    name: { type: String, required: true, maxLength: 300 },
    weight: { type: Number, required: true },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    sprintId: { type: Schema.Types.ObjectId, required: true, ref: 'Sprint' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    isComplete: { type: Boolean, required: true, default: false },
    completedOn: { type: Date, required: false },
    assignedTo: { type: Schema.Types.ObjectId, required: false }
},
    { timestamps: true, toJSON: { virtuals: true } }
)
TaskSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
TaskSchema.virtual('project', {
    localField: 'projectId',
    foreignField: '_id',
    justOne: true,
    ref: 'Project'
})
TaskSchema.virtual('sprint', {
    localField: 'sprintId',
    foreignField: '_id',
    justOne: true,
    ref: 'Sprint'
})