import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import {FaUserPlus} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { isAction } from '@reduxjs/toolkit';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar';  
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import { FiArrowUpLeft } from "react-icons/fi";
import Searchuser from './Searchuser';

const Sidebar = () => {
    const user =useSelector(state=> state?.user)
    const [allUser,setAllUser]= useState([])
    const [openSearchUser,setOpenSearchUser] = useState(false)
    const [editUserOpen,setEditUserOpen]=useState(false);
    const socketConnection = useSelector(state => state?.user?.socketConnection)

    // useEffect(() =>{
    //         if(socketConnection){
    //             socketConnection.emit('sidebar',user._id)
    //         }
    // },[socketConnection,user])
    useEffect(() => {
        if (socketConnection && user?._id) {
            // Validate if user._id is a proper ObjectId
            if (/^[a-fA-F0-9]{24}$/.test(user._id)) {
                socketConnection.emit('sidebar', user._id);
                socketConnection.on('conversation',(data)=>{
                    console.log("conversation",data)

                    const conversationUserData = data.map((conversationUser,index)=>{

                        if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                            return{
                                ...conversationUser,
                                userDetails:conversationUser.sender
                            }
                        }
                        else if(conversationUser?.receiver?._id !== user?._id){
                            return{
                                ...conversationUser,
                                userDetails:conversationUser.receiver
                            }
                        }else{
                            return{
                                ...conversationUser,
                                userDetails:conversationUser.sender
                            }
                        }
                       
                    })
                    setAllUser(conversationUserData)
                })
            } else {
                console.error('Invalid user._id:', user._id);
            }
        }
    }, [socketConnection, user]);
    
return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600  flex flex-col justify-between'>
             
             <div>   
                    <NavLink className={({isAction})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isAction && "bg-slate-500"}`}title='chat'>
                    <IoChatbubbleEllipsesSharp  size={20}/>
                    </NavLink>

                    <div title='add friend' onClick={()=>setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                        <FaUserPlus
                        size={20}/>
                    </div>
             </div>
              
              <div className='flex flex-col items-center'>
                <button className='mx-auto' title={user?.name} onClick={()=>setEditUserOpen(true)}>
                    <Avatar
                    width={40}
                    height={40}
                    name={user?.name}
                    imageUrl={user?.profile_pic}
                    userId={user?._id}
                    />
                </button>
                <button title='logout'  className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                    <span className='-ml-2'>
                    <BiLogOut
                    size={20}/>
                    </span>
                </button>
              </div>
            
        </div>

        <div className='w-full '>
          <div className='h-16 flex items-center'>
                 <h2 className='text-xl font-bold p-4 text-slate-800 h-16 '> Message</h2>
          </div>
          <div className='bg-slate-200 p-[0.5px]'></div>

          <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto  scrollbar'>

               {
                   allUser.length === 0 && (
                        <div className='mt-12'>
                             <div className='flex justify-center items-center my-4 text-slate-400'>
                                <FiArrowUpLeft
                                size={50}/>
                             </div>
                             <p className='text-lg text-center text-slate-400'>Explore user to start a conversation with.</p>
                        </div>
                   )
                }
                {
                    allUser.map((conv,index)=>{
                        return(
                            // to={"/"+conv.userDetails._id}  chnage the user when click on it
                            <NavLink to={"/"+conv.userDetails._id} key={conv?._id} className='flex items-center py-3 px-2 gap-2 p-2 border hover:border-primary rounded hover:bg-slate-200 cursor-pointer'>  
                                <div>
                                    <Avatar
                                    imageUrl={conv.userDetails.profile_pic}
                                    name={conv?.userDetails?.name}
                                    width={40}
                                    height={50}
                                    />
                                    </div>
                                    <div>
                                       <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3> 
                                       <div className='text-slate-500 text-xs flex items-center gap-1'>
                                        <div>
                                             {
                                                conv.lastMsg.imageUrl &&(
                                                  <div className='flex items-center gap-1'>
                                                      <span><FaImage/></span>
                                                      {!conv?.lastMsg?.text  && <span>Video</span>}  
                                                  </div>
                                                )
                                             }
                                              {
                                                conv.lastMsg.videoUrl &&(
                                                  <div className='flex items-center gap-1'>
                                                      <span><FaVideo
                                                      /></span>
                                                    {!conv?.lastMsg?.text  && <span>Video</span>}  
                                                  </div>
                                                )
                                             }
                                        </div>
                                       <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text }</p>
                                        </div>
                                        </div>
                                        <p className='text-xs p-1 ml-auto w-6 h-6 flex justify-center bg-primary text-white rounded-full font-semibold'>{conv?.unseenMsg}</p>
                                </NavLink>
                        )
                    })
                }
          </div>
               
        </div>

        {/* edit user details */}
        {
            editUserOpen && (
                <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
            )
        }

        {/* search user */}
        {
            openSearchUser && (
                <Searchuser  onClose={()=>setOpenSearchUser(false)}/>
            
            )
        }
    </div>
)
}

export default Sidebar
