import express from "express"
import userController from "../controller/userController.js";
import validateUser from "../validate/validateUser.js";

const routes = express.Router()


routes.post("/create", validateUser.validationInsert, userController.insert)
routes.get("/search", userController.search)
routes.put("/update/:_id", userController.updateById)


export default routes