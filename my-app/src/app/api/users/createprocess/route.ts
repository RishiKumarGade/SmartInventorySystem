

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Process from "@/models/processSchema";
import ProcessPreset from "@/models/processPresetSchema";
import Item from "@/models/itemSchema";

import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json();
        const {newProcess,id,processItems} = reqBody;

        console.log(newProcess,id,processItems)
        let itemIds = []

        for (let i = 0; i < processItems.length; i++) {
            const processItem = await Item.findOne({type:processItems[i].type})
            if(!processItem){
                return  NextResponse.json({
                    message:'Some items are not available',
                })
            }
            const item = {type:processItem._id,count:processItems[i].count}
            itemIds.push(item)
        }

        processItems.map(async(procitem)=>{
            const processItem = await Item.findOne({type:procitem.type})
            if(!processItem){
                return  NextResponse.json({
                    message:'Some items are not available',
                })
            }
            const item = {type:processItem._id,count:procitem.count}
            itemIds.push(item)
    })
       await Process.create({collaborativeId:id,type:newProcess.type,items:itemIds,createdUser:userId,toCreate:newProcess.toCreate,toCreatePrice:newProcess.toCreatePrice,toCreateCount:newProcess.toCreateCount})
       await ProcessPreset.create({type:newProcess.type,items:processItems,toCreate:newProcess.toCreate})
            const response = NextResponse.json({
                message:'successfully created ',
            })

            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
