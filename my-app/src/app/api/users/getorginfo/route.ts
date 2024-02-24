

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Item from "@/models/itemSchema";
import Login from "@/models/loginModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {id} = reqBody
        const items = await Item.find({collaborativeId:id})
            const response = NextResponse.json({
                message:'sessions found',
                items: items,
            })
            
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
