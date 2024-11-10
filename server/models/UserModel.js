const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true,"provide the name"],
    },
    email:{
        type:String,
        required:[true,"provide the email"],
        unique:true
    },
    password :{
        type:String,
        required:[true,"provide password"],
    },
    profile_pic:{
        type:String,
        default:""
    },
},{
    timestamps:true
})
    
const UserModel=mongoose.model('User',userSchema)

module.exports= UserModel;