'use server'

import connectDB from "@/lib/connectDB"
import UserModel from "@/models/user.model"

export const userAction = async (data) => {
    await connectDB()
    const user = await UserModel.findOne({ email: data.email })
    if(!user){
        console.log('here')
        return await UserModel.create(data)
    }
    return user.toJSON()
}