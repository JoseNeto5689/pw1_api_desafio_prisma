import UserDB from "../database/UserDB";
import { Request, Response } from "express";
import { Technology } from "../types";

class UserController{

    async createUser(req: Request, res: Response){
        const db = new UserDB()
        const { name, user_name } : { name: string, user_name: string } = req.body

        const userExists = await db.findUserByName(user_name)

        if(!!userExists){
            return res.status(400).json({error: "User already exists"})
        }

        const user = await db.createUser({name, user_name})

        return res.json(user)
    } 

    async getUserTechnologies(req: Request, res: Response){
        const db = new UserDB()
        const user_name = req.user.user_name
        
        let userTechnologies = await db.getUserTechnologies(user_name)

        return res.json(userTechnologies)

    }

    async addTechnology(req: Request, res: Response){
        const db = new UserDB()
        const user_name:string = req.user.user_name
        const { title, deadline } : { title: string, deadline: string } = req.body

        const user = await db.findUserByName(user_name)

        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        if(new Date(deadline) < new Date()){
            return res.status(400).json({error: "Invalid date"})
        }

        const technology = await db.addTechnology(user_name, {title, deadline: new Date(deadline)})

        return res.json(technology)

    }

    async updateTechnology(req: Request, res: Response){
        const db = new UserDB()
        const user_name:string = req.user.user_name 
        const { title, deadline } : { title: string, deadline: string } = req.body
        const { id }: { id: string } = req.params as { id : string }

        const technologyOld: Technology | null = await db.getTechnology(user_name, id)

        if(!technologyOld){
            return res.status(404).json({error: "Technology not found"})
        }

        if(!!deadline && new Date(deadline) < new Date()){
            return res.status(400).json({error: "Invalid date"})
        }

        const technologyNew: Technology = {
            ...technologyOld,
            title: !!title ? title : technologyOld.title,
            deadline: deadline ? new Date(deadline) : technologyOld.deadline
        } 


        const technology = await db.updateTechnology(user_name, id, technologyNew)

        
        return res.json(technology)

    }

    async updateTechnologyStatus(req: Request, res: Response){
        const db = new UserDB()
        const user_name:string = req.user.user_name
        const { id }: { id: string } = req.params as { id : string }

        const technologyOld = await db.getTechnology(user_name, id)

        if(!technologyOld){
            return res.status(404).json({error: "Technology not found"})
        }

        const technologyNew: Technology | null = {
            ...technologyOld,
            studied: true
        } 

        const technology = await db.updateTechnology(user_name, id, technologyNew)

        
        res.json(technology)

    }

    async deleteTechnology(req: Request, res: Response){
        const db = new UserDB()
        const user_name:string = req.user.user_name 
        const { id }: { id: string } = req.params as { id : string }

        const technology = await db.getTechnology(user_name, id)

        if(!technology){
            return res.status(404).json({error: "Technology not found"})
        }

        await db.removeTechnology(user_name, id)

        const technologies = await db.getUserTechnologies(user_name)
        
        res.json({data: technologies})
    }
    


}

export default UserController