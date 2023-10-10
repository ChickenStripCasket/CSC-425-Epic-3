import mongoose from 'mongoose'
const { Schema } = mongoose;
const { randomUUID } = require('crypto')

export default userSchema = new Schema({
    // userID is a primary key
    userID: {
        type: 'UUID',
        default: () => randomUUID()
    },
});