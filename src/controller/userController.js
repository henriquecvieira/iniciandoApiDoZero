import User from "../models/user.js" 
import { v4 as uuidv4 } from 'uuid';


export default {
    insert: async (req, res) => {
        let user = req.body
        user._id = uuidv4()
        const resultCreate = await User.create(user)
        return res.status(201).json(resultCreate)
    },
    search: async (req, res) => {
        //const user = req.body
        const resultSearch = await User.find()
        return res.status(201).json({data: resultSearch})
    },
    updateById: async (req, res) => {
        let user = req.body
        const resultUpdateById = await User.findByIdAndUpdate(user)
        return res.status(201).json(resultUpdateById)
    }
}