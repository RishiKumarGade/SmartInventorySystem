"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { io } from "socket.io-client";



const socket = io("http://localhost:3001")
  
function page({params}) {
    const org_id = params.id

    const [newRaw,setNewRaw] = useState({});
    const [newProcess,setNewProcess] = useState({})
    const [items,setItems] = useState([]);
    const [processes,setProcesses]  = useState([]);
    const [processItems,setProcessItems] = useState([]);
    const [description,setDescription] = useState('')
    const [processItem,setProcessItem] = useState({});
    const [presets,setPresets] = useState([])
    const joinRoom = () => {
        if (org_id !== "") {
            socket.emit("join_room", { id:org_id  });
        }
      }

      useEffect(() =>{
        joinRoom();
      },[org_id])

    useEffect(()=>{
        getItems()
        getProcesses()
        setDescription(localStorage.getItem('desc')|| '')
    },[])


    useEffect(()=>{
        socket.on("UPDATED_RESPONSE",()=>{
            getItems()
            getProcesses()
        })
    },[socket])

    const getItems = async()=>{
        try {
            await axios.post('/api/users/getitems',{id:org_id}).then((res)=>{
                setItems(res.data.items);
            })
        } catch (error) {
        }
    }

    const getProcesses = async()=>{
        try {
            await axios.post('/api/users/getprocesses',{id:org_id}).then((res)=>{
                setProcesses(res.data.processes);
            })
        } catch (error) {
            
        }
    }

    const decreaseCount = async(id)=>{
        try {
            
        } catch (error) {
            
        }
    }

    const increaseCount = async(id)=>{
        try {
            
        } catch (error) {
            
        }
    }


    const addItem = async()=>{
        if(newRaw.type == null || newRaw.type == undefined || newRaw.type == ''){
            return
        }
        try {
            await axios.post('/api/users/additem',{...newRaw,id:org_id}).then(()=>{
getItems()
            })
        } catch (error) {
            
        }
        finally{
            setNewRaw({})
        }
    }

    const createProcess = async()=>{
        if(newProcess == null){
            return
        }
        try {
            await axios.post('/api/users/createprocess',{newProcess,id:org_id,processItems:processItems}).then(()=>{
                getProcesses()
            })
        } catch (error) {
            
        }
    }

    const addItemToProcess = ()=>{
        try {
            processItems.push(processItem)
        } catch (error) {
            
        }finally{
            setProcessItem(null)
        }
    }
    
    const getPresets = async()=>{
        try {
        await axios.post('/api/users/getpresets',{type: newProcess.type,toCreate:newProcess.toCreate}).then((res)=>{
            setPresets(res.data.presets)
        })
        } catch (error) {
            console.log(error)
        }
    }

    const usePreset = (preset)=>{
            presets.map((p)=>{
                if(preset.type == p.type){
                    for (let i = 0; i < preset.items.length; i++) {
                        const item = preset.items[i];
                        setProcessItems([...processItems,item])
                    }
                }
            })
    }


    useEffect(()=>{
        getPresets();
    },[newProcess])

    return  <>  

<div className="flex flex-col content justify-centre mt-28 text-white">
        <div className="grid grid-cols-2 gap-8 mt-8 place-items-center">
          <div className="text-white fade-in">
            <p className="text-2xl text-[#b5daff] mb-10 bg-white/10 h-[50px] w-[600px] flex items-center justify-center rounded-2xl">
            Raw material inventory
            </p>
            <div >
            
        {items.map((item)=>{
            return <div className="w-[100px] h-[100px] bg-[#A1EBA250] rounded-xl flex items-center justify-center" key={item._id} >{item.type}</div>
        })}
<div className='flex'>
<Dialog>
      <DialogTrigger asChild>
        <div className='w-[100px] h-[100px] bg-[#A1EBA250] rounded-xl flex items-center justify-center'>+</div> 
      </DialogTrigger>
      <DialogContent className="bg-white/90 w-[600px] h-[400px] text-black rounded-[40px] flex flex-col p-4 gap-4 items-center justify-center">
        <DialogHeader>
          <DialogDescription className='text-2xl'>
            Raw material details:
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center items-center'>
        <label className='w-[200px]'>Name of the raw material</label>
        <input type="text" className="py-2 mt-2 bg-white/40 border border-black ml-3 text-center p-2 rounded-md w-[150px] px-6" value={newRaw.type} onChange={e=>{setNewRaw({...newRaw,type:e.target.value})}}   />
        </div>
        <div className='flex justify-center items-center'>
        <label className='w-[150px]'>Price per unit</label>
        <input type="text" className="py-2 mt-2 bg-white/40 border border-black ml-3 text-center p-2 rounded-md w-[100px] px-6" value={newRaw.price} onChange={e=>{setNewRaw({...newRaw,price:e.target.value})}}   />
        </div>
        <div className='flex justify-center items-center'>
        <label className='w-[150px]'>Weight per unit</label>
        <input type="text" className="py-2 mt-2 bg-white/40 border border-black ml-3 text-center p-2 rounded-md w-[100px] px-6" value={newRaw.weight} onChange={e=>{setNewRaw({...newRaw,weight:e.target.value})}}   />
        </div>
        <div className='flex justify-center items-center'>
        <label className='w-[150px]'>Height per unit</label>
        <input type="text" className="py-2 mt-2 bg-white/40 border border-black ml-3 text-center p-2 rounded-md w-[100px] px-6" value={newRaw.height} onChange={e=>{setNewRaw({...newRaw,height:e.target.value})}}   />
        </div>
        <DialogFooter>
        <button onClick={e=>{e.preventDefault();addItem()}} className="bg-[#00adf1]  text-white px-8 py-2 rmt-2 mt-4 rounded-xl hover:bg-[#37bcf8] min-w-[120px]" > Add raw-material </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
</div>

</div>

          </div>
          <div className="flex flex-col items-center w-[100%] h-[100%] gap-9 fade-in">
            <div className="flex flex-col space-y-4 gap-7 bg-white/10 rounded-xl p-6 w-[75%] h-[100%]">
              <div className="flex justify-center items-center gap-3 text-center">
              <div>
        {processes.map((process)=>{
            return <div key={process._id} >{process.type}</div>
        })}
    </div>

<div>

<p>suggestion box</p>


{presets && <>

{presets.map((preset)=>{
    return <div key={preset._id}>
                <p> {preset.type} </p>
            <button onClick={(e)=>{e.preventDefault();usePreset(preset)}} > use this preset </button>
    </div>
})}

</>}

</div>

    <div className='text-black'>

        {processItems.map((processItem)=>{
            return <div key={processItem.type}>
                <p>{processItem.type}</p>
                <p>{processItem.count}</p>
            </div>
        })}

            <input type="text" onChange={(e)=>{setNewProcess({...newProcess,type:e.target.value})}} /> <br />
            <input type="text" onChange={(e)=>{setNewProcess({...newProcess,toCreate:e.target.value})}}  /><br />
            <input type="number" onChange={(e)=>{setNewProcess({...newProcess,toCreatePrice:e.target.value})}}  /><br />
            <input type="number" onChange={(e)=>{setNewProcess({...newProcess,toCreateCount:e.target.value})}}  /><br />

            <input type="text" onChange={(e)=>{e.preventDefault();setProcessItem({...processItem,type:e.target.value})}}/><br />
            <input type="number" onChange={(e)=>{e.preventDefault();setProcessItem({...processItem,count:e.target.value})}}/><br />
            <button onClick={(e)=>{e.preventDefault();addItemToProcess()}} >add item to process </button><br />

            <button onClick={e=>{e.preventDefault();createProcess()}} >create a process</button><br />

        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    

    
        
        

       
    </>

}

export default page