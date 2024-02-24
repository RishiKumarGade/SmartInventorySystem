

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Process from "@/models/processSchema";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json();
        const {id,processId} = reqBody;
       const process = await Process.findOne({collaborativeId:id,_id:processId});
        process.isDone = true;
        process.completedAt = Date.now();
        process.completedUser = userId;
        await process.save();
            const response = NextResponse.json({
                message:'successfully completed process',
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
