const { ConversationModel } = require("../models/ConversationModel")

const getConversation = async(currentUserId)=>{
    if(currentUserId){
        const currentUserConversation= await ConversationModel.find({
            "$or": [
                {sender:currentUserId},
                {receiver:currentUserId} 
            ]
        }).sort({ updatedAt: -1 }).populate('message').populate('sender').populate('receiver')

        console.log("currentUserConversation",currentUserConversation)
         
        
        const conversation = currentUserConversation.map((conv)=>{
        const countUnseenMsg = conv.message.reduce((preve,curr) => preve + (curr.seen ? 0 : 1),0)
            return{
                _id:conv?._id,
                sender:conv?.sender,
                receiver:conv?.receiver,
                unseenMsg : countUnseenMsg,
                lastMsg : conv.message[conv?.message?.length - 1]
            }
        })
        return  conversation
        
    }
    else{
        return []  //when user id is not come
    }
}

module.exports =getConversation