import mongoose from "mongoose"

const {model, Schema} = mongoose

const schema = new Schema({
    _id : String,    
    nome : {type: String},
    telephone :{type: String, unique: true},
    email : {type: String, unique: true, lowercase: true},
    password: {type: String, select: false},
    creatAt: {type: Date, default: Date.now}


})

export default model("user", schema, "user" )

