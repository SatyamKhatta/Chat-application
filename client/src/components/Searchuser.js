import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import CircularLoading from './CircularLoading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";

const Searchuser = ({onClose}) => {
  const [searchUser ,setsearchUser]=useState([])
  const [loading,setloading] =useState(false)
  const [search,setsearch] =useState("")

  const handleSearchUser = async()=>{
 const URL = `${process.env.REACT_APP_BACKEND_URL}/api/searchUser`
    
  try {
    setloading(true)
    const response = await axios.post(URL, {
      search:search
    })
    setloading(false)
    setsearchUser(response.data.data)
    
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
  }

  useEffect(()=>{
    handleSearchUser()
  },[search])
  console.log("search user : ",searchUser)

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
         <div className='w-full max-w-md mx-auto mt-10 '>
            {/* input search user */}
            <div className='bg-white rounded  overflow-hidden flex justify-center items-center'>
                <input
                type='text'
                placeholder='Search user by name , email....'
                className='w-full outline-none  py-1 h-full px-4'
                onChange={(e)=>setsearch(e.target.value)}
                value={search}
                />
                <div className='h-14 w-14  flex justify-center items-center '>
                <IoSearchSharp size={25}/>
                </div>
            </div>
            {/* display search user */}
            <div className='bg-white mt-2 w-full p-4 rounded'>
                {/* no user found */}
                {
                  searchUser.length === 0 && !loading && (
                    <p className='text-center text-slate-500'>no user found!</p>
                  )
                }
                {
                  loading &&(
                    <p><CircularLoading/></p>
                  )
                }
                {
                  searchUser.length !==0 && !loading &&(
                    searchUser.map((user,index)=>{
                        return (
                          <UserSearchCard key={user._id} user={user} onClose={onClose}/>
                        )
                    })
                  )
                }
            </div>
         </div>
         <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
          <button>
            <IoCloseOutline/>
          </button>
         </div>
    </div>
  )
}

export default Searchuser
