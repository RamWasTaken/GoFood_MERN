const mongoose = require("mongoose");
const { Schema } = mongoose; //calling schema out of mongoose using de-structuring.

//Define Schema for User

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date : {
        type : Date,
        default:Date.now
    }
})

module.exports=mongoose.model('user',UserSchema)