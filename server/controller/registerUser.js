const UserModel = require('../models/UserModel')
const bcryptjs =require('bcryptjs')

async function registerUser(req,res) {
    try {
         
        const {name,password,email,profile_pic}= req.body;
        const checkEmail= await UserModel.findOne({email}); 

        if(checkEmail) {
            return res.status(400).json({
                message : "user Already exits",
                error :true,
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password,salt)

        const payload= {
            name,
            email,
            profile_pic,
            password:hashpassword,
        }
        const user = new UserModel(payload);
        const usersave = await user.save();

        return res.status(201).json({
            message: "User is created successfully",
            data: usersave,
            success:true,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error:true
        })
    }
    
}


module.exports =registerUser