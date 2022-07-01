
const userSchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    telephone: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['nome', 'telephone', 'email', 'password'],
  additionalProperties: false
}

export default userSchema
