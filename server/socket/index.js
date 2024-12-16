const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const { set } = require('mongoose')
const UserModel = require('../models/UserModel')

const app = express()

// socket connection
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: process.env.Frontend_url,
        credentials:true
    }
})

const onlineUser = new Set()
io.on('connection',async(socket)=>{
    console.log("connect user ",socket.id)

    const token =   socket.handshake.auth.token

    // current user detail
   const user = await getUserDetailsFromToken(token)
    
    //    create a room
   socket.join(user?._id)
   onlineUser.add(user?._id?.toString())

   io.emit('onlineUser',Array.from(onlineUser))

   socket.on('message-page',async(userId)=>{
    console.log('userId : ',userId)
    
    const userDetails = await UserModel.findById(userId).select("-password")

    const payload= {
        _id:userDetails?._id,
        name:userDetails?.name,
        email:userDetails?.email,
        profile_pic:userDetails?.profile_pic,
        online:onlineUser.has(userId),
    }
    socket.emit('message-user',payload)
   })

    // disconnect 
    socket.on('disconnect',()=>{
        onlineUser.delete(user?._id)
        console.log("disconnect user",socket.id)

    })
})

module.exports={
    app,
    server
}