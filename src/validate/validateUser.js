import Ajv from 'ajv'

import userSchema from './userSchema.js'
const ajv = new Ajv({ allErrors: true, jsPropertySyntax: true })

export default {
  validationInsert: async (req, res, next) => {
    const user = req.body
    const userValidate = ajv.compile(userSchema)
    const validateUser = userValidate(user)

    if (validateUser === false) {
      return res.status(400).json({ message: userValidate.errors })
    }
    return next()
  }
}
