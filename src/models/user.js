import mongoose from "mongoose"

const {model, Schema} = mongoose

const schema = new Schema({
    _id : String,    
    nome : {
        type: "string"        
    },
    telephone :{
        type: "string",
        unique: true
       
    }

})

export default model("user", schema, "user" )

