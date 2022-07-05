import User from '../models/User.js'
import { v4 as uuidv4 } from 'uuid'
import token from '../middlewares/token.js'
import bcrypt from 'bcrypt'

export default {

  insert: async (req, res) => {
    try {
      const user = req.body

      const validateName = await user.name
      const validateEmail = await User.findOne({ email: user.email })

      if (validateName === ' ') {
        return res.status(400).send({ error: 'The name field is mandatory' })
      }
      if (validateEmail) {
        return res.status(400).send({ error: 'User already exists' })
      }

      user._id = uuidv4()
      const resultCreate = await User.create(user)
      resultCreate.password = undefined
      const tokenGeneration = await token.generationToken({ resultCreate })

      return res.status(201).json({ resultCreate, token: tokenGeneration })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: 'Registration failed' })
    }
  },
  login: async function (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email }).select(User.password)
      const senha = bcrypt.compare(password, user, () => {
        console.info('show!')
      })
      if (senha) {
        return res.status(200).json({ user, successs: 'user connected!' })
      }
      const tokenGeneration = await token.generationToken({ user })
      return res.status(200).json({ user, token: tokenGeneration })
    } catch (error) {
      return res.status(400).json({ error: 'Registration failed' })
    }
  },
  search: async (_, res) => {
    const resultSearch = await User.find()
    return res.status(200).json({ data: resultSearch })
  },
  searchById: async (req, res) => {
    try {
      const user = req.params
      const resultSearchById = await User.findById(user)
      if (!resultSearchById) {
        res.status(404).json({ error: 'there is no user found, insert the correct id!!' })
      } else {
        return res.status(200).json(resultSearchById)
      }
    } catch (error) {
      return res.status(400).json({ error: 'there is something wrong' })
    }
  },
  deleteById: async (req, res) => {
    try {
      const user = req.params
      const resultFindById = await User.findOne({ _id: user })
      if (!resultFindById) {
        return res.status(404).json({ error: 'user was not found, insert the correct id!!' })
      }
      await User.deleteOne({ _id: user._id })
      return res.status(200).json(resultFindById)
    } catch (error) {
      return res.status(400).json({ error: 'there is something wrong' })
    }
  },
  updateById: async (req, res) => {
    try {
      const id = req.params
      const data = req.body
      const resultsFindById = await User.findOne({ _id: id })
      if (!resultsFindById) {
        return res.status(404).json({ error: 'user was not found!!' })
      }
      await User.updateOne({ _id: id }, data)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({ error: 'there is something wrong' })
    }
  }

}
