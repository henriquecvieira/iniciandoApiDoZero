import Ajv from 'ajv'
let ajv = new Ajv({ allErrors: true, jsPropertySyntax: true })

import userSchema from "./userSchema.js"


export default {
    validationInsert: async (req, res, next) => {
        const user = req.body
        const userValidate = ajv.compile(userSchema)
        const validateUser = userValidate(user)

        if (validateUser === false) {
            return res.status(400).json({message: userValidate.errors})
        }
        return next()
    }
}   
