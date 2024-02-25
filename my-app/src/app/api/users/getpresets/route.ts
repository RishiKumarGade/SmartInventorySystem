

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Item from "@/models/itemSchema";
import ProcessPreset from "@/models/processPresetSchema";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {type,toCreate} = reqBody
        const presets = await ProcessPreset.find({type:type,toCreate:toCreate})
            const response = NextResponse.json({
                presets: presets,
            })
            
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
