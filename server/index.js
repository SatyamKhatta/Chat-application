const express = require('express');
const cors = require('cors');
require('dotenv').config;
const connectDB =require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const {app ,server} = require('./socket/index')

// const app = express();
app.use(express.json());
app.use(cookiesParser())

app.use(cors({
    // origin: process.env.Frontend_url,
    // credential:true
    origin: 'http://localhost:3000',  // Allow requests from the frontend
   credentials: true,  // Allow cookies and credentials to be sent
}))

app.get('/',(req,res)=>{
    res.json({
        msg: "server is running successfully",
    })
})

// apis
app.use('/api',router);

const PORT = process.env.PORT || 8080;

connectDB().then(()=>{
    server.listen(PORT ,() =>{
    console.log(`Server is running on port : ${PORT}`)
})
})
// // Call connectDB() to start the connection
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port : ${PORT}`);
//     });
// }).catch(error => {
//     console.error('Failed to connect to the database:', error);
// });