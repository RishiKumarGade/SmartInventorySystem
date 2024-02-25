'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {

  let org_id ;


  useEffect(() =>{
    org_id = location.pathname.split('/')[2]
    getProcesses()
  },[])


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