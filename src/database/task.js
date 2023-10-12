import mongoose from 'mongoose'
const { Schema } = mongoose;
const { randomUUID } = require('crypto')

const taskSchema = new Schema({
    // userID is a foreign key that must be obtained from the User collection.
    userID: {
        type: 'UUID',
    },
    // taskID is a primary key
    taskID: {
        type: 'UUID',
        default: () => randomUUID()
    },
    title: String,
    description: String,
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Task', taskSchema);
