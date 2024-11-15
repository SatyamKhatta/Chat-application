const UserModel = require("../models/UserModel");

async function checkEmail(req,res){
    try {
        const {email}= req.body;
        const checkEmail = await UserModel.findOne({email})
        if(!checkEmail) {
           return res.status().json({
            message:"User do not exit",
            error:true
           })
        }
        return res.status(201).json({
            message: "email verify success",
            success : true ,
            data:checkEmail
        })
    } catch (error) {
        return res.status(500).json( {
            message : error.message || error,
            error : true
        })
    }
}

module.exports = checkEmail