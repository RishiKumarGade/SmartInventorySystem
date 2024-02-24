

import { connect } from "@/dbConfig/dbConfig";
import Collaborative from "@/models/Collaborative";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {id,email} = reqBody

        const collaborativeStorage = await Collaborative.findOne({_id:id})
        const user = await User.findOne({email:email})
        if(!user){
            const response = NextResponse.json({
                message:'no user found',
                success:false
            })
            return response
        }
        collaborativeStorage.readWriteAccess.push(user._id)
        await collaborativeStorage.save()
            const response = NextResponse.json({
                message:'updated successfully',
                success:true
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
