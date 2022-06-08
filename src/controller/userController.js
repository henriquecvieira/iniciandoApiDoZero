import User from "../models/user.js"
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto"


const generate = function () {
    return crypto.randomBytes(5).toString("hex")     
}
export default {
   
    insert: async (req, res) => {
        try{ 
            const user = req.body
            user._id = uuidv4()   
            // user.nome = generate()
            // user.telephone = generate()     
            const validateTelephone = await User.findOne({telephone: user.telephone})
            const validateNome = await User.findOne({nome: user.nome})
            if (validateTelephone || validateNome ){
                return res.status(201).json({error: "user already exists!!"})
            }            
            const resultCreate = await User.create(user)
            return res.status(201).json(resultCreate)
            
        }catch(err){
            return res.status(400).json({error: "registration failed!!"})
        }
    },
    search: async (_, res) => {
        //const user = req.body
        const resultSearch = await User.find()
        return res.status(200).json({ data: resultSearch })
    },
    searchById: async (req, res) => {
        try{
            const user = req.params
            const resultSearchById = await User.findById(user)
            if (!resultSearchById) {
                res.status(404).json({error: "there is no user found, insert the correct id!!"})               
            }else{
                return res.status(200).json(resultSearchById)
            }
        }catch(error){
            return res.status(400).json({error: "there is something wrong"})
        }        
    },
    deleteById: async (req, res) => {
        try{
            const user = req.params
            const resultFindById = await User.findById({_id: user})
            if (!resultFindById){
                return res.status(404).json({error: "user was not found, insert the correct id!!"})
            } 
            await User.deleteOne({_id: user._id})
            return res.status(200).json(resultFindById)              
        }catch(error){
            return res.status(400).json({error: "there is something wrong"})
        }        
    },
    updateById: async (req, res) => {
        try {
            const id = req.params
            const data  = req.body        
            const resultsFindById = await User.findOne({_id: id})
            if (!resultsFindById){
                return res.status(404).json({error: "user was not found!!"})
            }             
            const resultUpdateById = await User.updateOne({_id: id}, data)
            return res.status(200).json(resultUpdateById)              
            
        } catch (error) {
            return res.status(400).json({error: "there is something wrong"})
        }
       
    }   


}

