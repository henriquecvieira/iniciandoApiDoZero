
const userSchema = {
    type: "object",
    properties: {
        nome:{type: "string"},
        telephone: {type: "string"}
    },
    required: ["nome", "telephone"], 
    additionalProperties: false
}

export default userSchema


