import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { model, Schema } = mongoose

const schema = new Schema({
  _id: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  creatAt: { type: Date, default: Date.now }

})

schema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})
export default model('User', schema, 'User')
