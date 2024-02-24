"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function page({params}) {
    const org_id = params.id

    const [newRaw,setNewRaw] = useState({});
    const [newProcess,setNewProcess] = useState({})
    const [items,setItems] = useState([]);
    const [processes,setProcesses]  = useState([]);
    const [email,setEmail] = useState('');

    useEffect(()=>{

        getItems()
        getProcesses()

    },[])


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
            await axios.post('/api/users/createprocess',{...newProcess,id:org_id}).then(()=>{

            })
        } catch (error) {
            
        }
    }

    const giveAcess = async()=>{
        if(email == ''){
            return
        }
        try {
            await axios.post('/api/users/giveaccess',{email,id:org_id}).then(()=>{
                console.log('successful')
            })
        } catch (error) {
            
        }
    }


    return (
        <> 
        
        <div>
            {processes.map((process)=>{
                return <div key={process._id} >{process.type}</div>
            })}
        </div>

        <div>
            {items.map((item)=>{
                return <div key={item._id} >{item.type}</div>
            })}
        </div>

        <div>

            <input type="text" value={newRaw.type} onChange={e=>{setNewRaw({...newRaw,type:e.target.value})}}   />
            <input type="number" value={newRaw.price} onChange={e=>{setNewRaw({...newRaw,price:e.target.value})}}   />
            <input type="number" value={newRaw.weight} onChange={e=>{setNewRaw({...newRaw,weight:e.target.value})}}   />
            <input type="number" value={newRaw.height} onChange={e=>{setNewRaw({...newRaw,height:e.target.value})}}   />
            <button onClick={e=>{e.preventDefault();addItem()}} > add </button>
        </div>
            
            <div>

                <input type="text" onChange={(e)=>{setNewProcess({...newProcess,type:e.target.value})}} />
                <button onClick={e=>{e.preventDefault();createProcess()}} >create a process</button>

            </div>

            <div>
                <input type="email" value={email} onChange={e=>{setEmail(e.target.value)}} />
                <button onClick={e=>{e.preventDefault();giveAcess()}}>give access</button>
            </div>

        </>
  )
}

export default page