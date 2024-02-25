'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { io } from "socket.io-client";
const socket = io("http://localhost:3001")

function Page() {

  let org_id ;


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


    const [completedProcesses, setCompletedProcesses] = useState([])

    const getProcesses = async()=>{
        try {
            await axios.post('/api/users/getcompletedprocesses',{id:org_id}).then((res)=>{
                setCompletedProcesses(res.data.processes);
            })
        } catch (error) {
            
        }
    }
   

  return (
  <>
  
  {completedProcesses.map((process) => {
    return <p key={process._id}>{process._id}</p>
  })}

  </>
  )
}

export default Page