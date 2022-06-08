import express from "express"
import userController from "../controller/userController.js";
import validateUser from "../validate/validateUser.js";

const routes = express.Router()

routes.post("/create", validateUser.validationInsert, userController.insert)
routes.get("/search", userController.search)
routes.get("/search/:_id", userController.searchById)
routes.delete("/delete/:_id", userController.deleteById)
routes.put("/update/:_id", validateUser.validationInsert, userController.updateById)

export default routes