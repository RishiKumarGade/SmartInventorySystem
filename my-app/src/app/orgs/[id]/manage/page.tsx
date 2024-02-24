'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

async function Page() {

   

  let org_id:string ;


  useEffect(() =>{
    org_id = location.pathname.split('/')[2]
    getProcesses()
  },[])

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
            await axios.post('/api/users/getprocesses',{id:org_id}).then((res)=>{
                setRemainingProcesses(res.data.processes);
            })
        } catch (error) {
            
        }
    }

    const completeProcess = async(p_id)=>{
        try {
            await axios.post('/api/users/completeprocess',{id:org_id,processId:p_id}).then((res)=>{
                console.log('successful')
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
                    <button onClick={e=>{e.preventDefault();completeProcess(process._id)}}>complete process</button>
                </div>  
            })}
        </div>

    </div>
  )
}

export default Page