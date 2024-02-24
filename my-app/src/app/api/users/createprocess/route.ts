

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
        const {type,id,items} = reqBody;

       await Process.create({collaborativeId:id,type:type,items:items,createdUser:userId});
            const response = NextResponse.json({
                message:'successfully created ',
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
