

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Collaborative from "@/models/Collaborative";
import Login from "@/models/loginModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const collaborativeStorages = await Collaborative.find({userId:userId})
            const response = NextResponse.json({
                message:'Storages found',
                collaborativeStorages:collaborativeStorages
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
