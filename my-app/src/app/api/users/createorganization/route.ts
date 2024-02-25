

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Collaborative from "@/models/Collaborative";
import Access from "@/models/AccessSchema";
import Login from "@/models/loginModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json();
        const {name,desc} = reqBody;
       const cb = await Collaborative.create({userId:userId,name:name,description:desc});
       await Access.create({collaborativeId:cb._id,userId:userId});
            const response = NextResponse.json({
                message:'successfully created ',
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
