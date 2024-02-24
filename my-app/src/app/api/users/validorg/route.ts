

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Access from "@/models/AccessSchema";
import Collaborative from "@/models/Collaborative";
import Login from "@/models/loginModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json();
        const {id} = reqBody;
        const access = await Access.findOne({userId:userId,collaborativeId:id})
        if(access){
            return NextResponse.json({valid:true})
        }else{
            return NextResponse.json({valid:false,message:"youre not authorized"})
        }
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
