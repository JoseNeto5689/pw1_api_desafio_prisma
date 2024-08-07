import { Router } from "express";
import UserController from "../controllers/UserController";
import checkExistsUserAccount from "../middleware/checkExistsUserAccount";

const routes : Router = Router()

const userController: UserController = new UserController()

routes.post("/users", userController.createUser)
routes.post("/technologies", checkExistsUserAccount,userController.addTechnology)

routes.put("/technologies/:id", checkExistsUserAccount,userController.updateTechnology)

routes.patch("/technologies/:id/studied", checkExistsUserAccount,userController.updateTechnologyStatus)

routes.get("/technologies", checkExistsUserAccount,userController.getUserTechnologies)

routes.delete("/technologies/:id", checkExistsUserAccount,userController.deleteTechnology)


export default routes