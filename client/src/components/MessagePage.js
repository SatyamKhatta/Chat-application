import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const MessagePage = () => {

  const params= useParams()
  const socketConnection=useSelector(state =>state?.user?.socketConnection)
  console.log("params",params.userId)

  useEffect(()=> { 
    if(socketConnection) {
      socketConnection.emit("message-page",params.userId)

      socketConnection.on('message-user',(data)=>{
        console.log("user-details",data)
      })
    }
  },[socketConnection,params?.userId])
  return (
    <div>
      MessagePagedvefv
    </div>
  )
}

export default MessagePage
