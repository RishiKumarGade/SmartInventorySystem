"use client"
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Page() {

    const [collaborativeStorages,setCollaborativeStorages] =useState([]);
    const [name,setName] = useState('')


    const getAllStorages = async() =>{
        try {
           await axios.get('/api/users/getallstorages').then((res)=>{
            setCollaborativeStorages(res.data.collaborativeStorages)
           })
        } catch (error) {
            console.error(error)
        }
    }

    const createCollaborativeStorage = async() =>{
      if(name == '' ){
        toast.error("please provide a name")
        return 
      }
        try {
          axios.post('/api/users/createorganization',{name}).then((res)=>{
            getAllStorages()
          })
        } catch (error) {
          console.error(error)
        }
    }

    useEffect(()=>{
      getAllStorages()
    },[])

  return (
    <div>

      <div>
        {collaborativeStorages.length >0 && <>
        {
          collaborativeStorages.map((stor)=>{
            return <p key={stor._id}> <Link href={`/orgs/${stor._id}`} >{stor.name} </Link>  </p>
          })
        }
        </>}
      </div>
      <div>

      <input type="text" value={name} onChange={(e)=>{e.preventDefault();setName(e.target.value)}}/>
        <button onClick={(e)=>{e.preventDefault();createCollaborativeStorage()}} > create </button>
      </div>

    </div>
  )
}

export default Page