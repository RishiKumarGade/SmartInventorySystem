'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";



const socket = io("http://localhost:3001")
function Page() {


  let org_id


  useEffect(() =>{
    org_id = location.pathname.split('/')[2]
    getProcesses()
  },[])

  const joinRoom = () => {
    if (org_id !== "") {
        socket.emit("join_room", { id:org_id  });
    }
  }

  useEffect(() =>{
    joinRoom();
  },[org_id])


    const [email,setEmail] = useState('');

    const giveAccess = async()=>{
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


    const [remainingProcesses, setRemainingProcesses] = useState([])

    const getProcesses = async()=>{
        try {
            await axios.post('/api/users/getremainingprocesses',{id:org_id}).then((res)=>{
                setRemainingProcesses(res.data.processes);
            })
        } catch (error) {
            
        }
    }

    const completeProcess = async(p_id,o_id)=>{
        o_id =  location.pathname.split('/')[2]
        try {
            await axios.post('/api/users/completeprocess',{id:o_id,processId:p_id}).then((res)=>{
                console.log('successful')
                getProcesses()
            })
        } catch (error) {
            
        }
    }


   

  return (
    <div>

        <div>
                <input type="email" value={email} onChange={e=>{setEmail(e.target.value)}} />
                <button onClick={e=>{e.preventDefault();giveAccess()}}>give access</button>
            </div>


        <div>
            {remainingProcesses.map((process)=>{
                return <div key={process._id}>
                    <p >{process._id}</p>
                    <button onClick={e=>{e.preventDefault();completeProcess(process._id,org_id)}}>complete process</button>
                </div>  
            })}
        </div>

    </div>
  )
}

export default Page