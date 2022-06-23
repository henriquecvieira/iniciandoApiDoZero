import User from "../models/user.js"
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto"
import token from "../middlewares/token.js";
import bcrypt from "bcrypt"
import  auth from "../middlewares/auth.js";


const generate = function () {
    return crypto.randomBytes(5).toString("hex")     
}
export default {
   
    insert: async (req, res) => {
        try{ 
            const user = req.body
            user._id = uuidv4()                
            const validateTelephone = await User.findOne({telephone: user.telephone})
            const validateNome = await User.findOne({nome: user.nome})
            const validateEmail = await User.findOne({email: user.email})
            const validateSenha = await User.findOne({senha: user.senha})
            if (validateTelephone || validateNome || validateEmail ){
                return res.status(201).json({error: "user already exists!!"})
            }            
            let resultCreate = await User.create(user)            
            const resultToken = await token.generationToken(resultCreate)
            return res.status(201).json({resultCreate, resultToken} )
            
        }catch(err){
            return res.status(400).json({error: "registration failed!!"})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;   
            const user = await User.findOne({ email }).select({password});

            if(!user){
                return res.status(400).json({error: "User not found"})
            }
            if (!await bcrypt.compare( password , user.password )){
                return res.status(400).json({ error: "Invalid user" })
            }

            user.password = undefined;

            const tokenGeneration = await token.generationToken({user});
            return res.status(201).json({user , token: tokenGeneration});
        }catch(err){ 
            console.log(err)
            return res.status(400).json({error: 'Registration failed'});
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
            const resultFindById = await User.findOne({_id: user})
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
            await User.updateOne({_id: id}, data)
            return res.status(200).json(data)              
            
        } catch (error) {
            return res.status(400).json({error: "there is something wrong"})
        }
       
    }   


}

