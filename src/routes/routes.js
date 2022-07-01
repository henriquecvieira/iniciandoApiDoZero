import express from 'express'
import userController from '../controller/userController.js'
import validateUser from '../validate/validateUser.js'
import auth from '../middlewares/auth.js'

const routes = express.Router()

routes.post('/create', validateUser.validationInsert, userController.insert)
routes.get('/search', auth.auth, userController.search)
routes.get('/search/:_id', auth.auth, userController.searchById)
routes.delete('/delete/:_id', auth.auth, userController.deleteById)
routes.put('/update/:_id', auth.auth, validateUser.validationInsert, userController.updateById)

export default routes
