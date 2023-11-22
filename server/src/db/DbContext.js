import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TaskSchema } from '../models/Task.js';
import { ProjectSchema } from '../models/Project.js';
import { SprintSchema } from '../models/Sprint.js';
import { NoteSchema } from '../models/Note.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
  Notes = mongoose.model('Note', NoteSchema)
}

export const dbContext = new DbContext()
