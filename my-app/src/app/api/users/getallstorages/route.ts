

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
        const accesses = await Access.find({userId:userId})
        let collaborativeStorages = []
        for(var i = 0; i < accesses.length; i++) {
            await Collaborative.findOne({userId:userId,_id:accesses[i].collaborativeId}).then(collaborative =>{
                collaborativeStorages.push(collaborative)
            })
        }
        

            const response = NextResponse.json({
                message:'Storages found',
                collaborativeStorages:collaborativeStorages
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
