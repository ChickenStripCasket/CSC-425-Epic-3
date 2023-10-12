import mongoose from 'mongoose'
const { Schema } = mongoose;
const { randomUUID } = require('crypto')

const userSchema = new Schema({
    // userID is a primary key
    userID: {
        type: 'UUID',
        default: () => randomUUID()
    },
});

export default mongoose.model('User', taskSchema);
