const express = require('express');
const cors = require('cors');
require('dotenv').config;
const connectDB =require('./config/connectDB')
const router = require('./routes/index')

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.Frontend_url,
    credential:true
}))

app.get('/',(req,res)=>{
    res.json({
        msg: "server is running successfully",
    })
})

// apis
app.use('/api',router)

const PORT = process.env.PORT || 8080;

connectDB.then(()=>{
app.listen(PORT ,() =>{
    console.log(`Server is running on port : ${PORT}`)
})
})
