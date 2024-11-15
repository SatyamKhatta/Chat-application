const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkPassword(req,res) {
    try {
        const {password,userId}= req.body;
        const user = await UserModel.findById(userId)

        const verifyPassword = await bcryptjs.compare(password,user.password)
        
        if(!verifyPassword) {
            return res.status(401).json({
                message: "password is not correct ",
                error: true,
            })
        }


        const tokendata ={
            id:user.i_id,
            email : user.email
        }

        const token = await jwt.sign(tokendata,process.env.JWT_SECREATKEY,{expiresIn :'1d'})

        const cookieOptions= {
            http:true,
            secure:true,
        }

        return res.cookie('token',token,cookieOptions).status(201).json({
            message:"login successfully",
            token:token,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error :true 
        })
    }
}

module.exports = checkPassword