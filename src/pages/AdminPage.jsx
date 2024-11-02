import React, { useEffect, useState } from 'react'
import * as api from "../api/index.js"
import { Typography } from '@mui/material'

const AdminPage = () => {

    const [users, setUsers] = useState({})
    useEffect(()=>{
        const getUsers= async ()=>{
        const {data} = await api.fetchUsers();
        setUsers(data)
        }
        getUsers()
       },[])
       console.log(users)
  return (
    <div>
      <Typography>Hi</Typography>
    </div>
  )
}

export default AdminPage
