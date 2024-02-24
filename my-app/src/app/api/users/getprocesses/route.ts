

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Item from "@/models/itemSchema";
import Login from "@/models/loginModel";
import Process from "@/models/processSchema";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {id} = reqBody
        const processes = await Process.find({collaborativeId:id})
            const response = NextResponse.json({
                message:'sessions found',
                processes: processes,
            })
            
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
