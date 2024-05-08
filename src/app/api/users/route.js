import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import UserSchema from '@/models/user.model'

export const POST = async (request, context) => {
    await connectDB()
    const body = await request.json();

   return NextResponse.json({message:"POST request to the homepage" ,body})
}