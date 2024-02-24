

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Collaborative from "@/models/Collaborative";
import Login from "@/models/loginModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json();
        const {name} = reqBody;
       await Collaborative.create({userId:userId,name:name});
            const response = NextResponse.json({
                message:'successfully created ',
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
