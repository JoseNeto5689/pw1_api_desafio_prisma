import { Technology, User } from "@prisma/client"
import prismaClient from "."

export default class UserDB{

    async findUserByName(user_name: string) : Promise<User | null>{
        const user = await prismaClient.user.findFirst({
            where: {
                user_name
            }
        })

        return user
    }

    async getUserTechnologies(user_name: string){
        const user = await prismaClient.user.findFirst({
            where: {
                user_name
            },
            include: {
                technologies: true
            }
        })
        if(!user) {
            return null
        }
        return user.technologies
    }

    async createUser(user: { name: string, user_name: string }): Promise<User>{
        const userCreated = await prismaClient.user.create({
            data: user
        })

        return userCreated


    }

    async deleteUser(userId: string ): Promise<void>{
        await prismaClient.user.delete({
            where: {
                id: userId
            }
        })
    }

    async updateUser(oldUserID: string, newUser: User): Promise<User | null>{
        const user = await prismaClient.user.update({
            where: {
                id: oldUserID
            },
            data: newUser
        })

        return user
        
    }

    async getTechnology(user_name: string, technologyId: string) : Promise<Technology | null>{
        const user = await prismaClient.user.findFirst({
            where:{
                user_name
            },
            include: {
                technologies: true
            }
        })

        if(!user){
            return null
        }

        const technology = user.technologies.find((value) => value.id === technologyId)

        return technology || null
    }

    async addTechnology(user_name: string, data: { title: string, deadline: Date}){
        const user = await prismaClient.user.findFirst({
            where: {
                user_name
            }
        })

        if(!user){
            return null
        }

        const technology = await prismaClient.technology.create({
            data: {
                ...data,
                studied: false,
                userId: user.id
            }
        })

        return technology
    }

    async removeTechnology(userName: string, technologyId: string){
        const user = await prismaClient.user.findFirst({
            where: {
                user_name: userName
            }
        })

        if(!user){
            return null
        }

        await prismaClient.technology.delete({
            where: {
                id: technologyId
            }
        })
    }

    async updateTechnology(userName: string, technologyId: string, technology: Technology){
        const user = await prismaClient.user.findFirst({
            where: {
                user_name: userName
            }
        })

        if(!user){
            return null
        }

        const technologyCreated = await prismaClient.technology.update({
            where: {
                id: technologyId
            },
            data: technology
        })

        return technologyCreated

    }


}