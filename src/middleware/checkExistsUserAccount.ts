import { NextFunction, Request, Response } from "express";
import UserDB from "../database/UserDB";

export default async function checkExistsUserAccount(req: Request, res: Response, next: NextFunction){
    const db = new UserDB()
    const { user_name } : { user_name: string } = req.headers as { user_name: string } 
    const user = await db.findUserByName(user_name)
    if(!user){
        return res.status(404).json({error: "user not found"})
    }
    req.user = user
    next()

}