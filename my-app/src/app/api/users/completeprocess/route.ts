

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Item from "@/models/itemSchema";
import ItemCount from "@/models/ItemCountSchema";
import Process from "@/models/processSchema";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json();
        const {id,processId} = reqBody;
        const process = await Process.findOne({collaborativeId:id,_id:processId});
        let item = await Item.findOne({collaborativeId:id,type:process.toCreate})
        if(item == null){
        item = await Item.create({collaborativeId:id, type:process.toCreate,price:process.toCreatePrice}) 
        } 
        await Item.create({collaborativeId:id,type:process.toCreate,isRaw:false,price:process.toCreatePrice})
        await ItemCount.create({collaborativeId:id,itemId:item._id,count:process.toCreateCount})
        
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
