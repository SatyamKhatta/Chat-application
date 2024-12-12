import React, { useState } from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import {FaUserPlus} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { isAction } from '@reduxjs/toolkit';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';

const Sidebar = () => {
    const user =useSelector(state=> state?.user)
    const [editUserOpen,setEditUserOpen]=useState(false);
return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600  flex flex-col justify-between'>
             
             <div>   
                    <NavLink className={({isAction})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isAction && "bg-slate-500"}`}title='chat'>
                    <IoChatbubbleEllipsesSharp  size={20}/>
                    </NavLink>

                    <div title='add friend' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
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
          <div className=''>
                 <h2 className='text-xl font-bold p-4 text-slate-800 h-16 '> Message</h2>
          </div>
           <Divider/>
        </div>

        {/* edit user details */}
        {
            editUserOpen && (
                <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
            )
        }
    </div>
)
}

export default Sidebar
