const mongoose = require('mongoose')
require('dotenv').config();

async function connectDB() {
   try {
        await mongoose.connect(process.env.MONGODB_URL)
        const connection =mongoose.connection;

        connection.on('connected',()=>{
            console.log("connected to mongodb successfully!!");
        })

        connection.on('error',()=>{
            console.log("NOT CONNECTED WITH MONGODB");
        })
   } catch (error) {
    console.log("something went wrong ",error)
   }
}

module.exports  = connectDB
