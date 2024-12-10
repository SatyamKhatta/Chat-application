

import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFiles';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../components/Avatar';



const CheckPasswordPage = () => {
  
  const [data,setdata]=useState({

    password:"",

  })
  const navigate = useNavigate()
  const location = useLocation();
  console.log("location  :  ",location.state)

  useEffect(()=>{
    if(!location?.state?.name){
      navigate('/email')
    }
  },[])

  const handleOnChange =(e)=>{
    const {name,value} = e.target
    setdata((preve)=> {
       return {
         ...preve,
         [name]:value
       }
    })
 }
  

  const handleSubmit =async(e)=>{
      e.preventDefault()
      e.stopPropagation()
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`
      try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
          setdata({
            
            password:"",
          
          })
          navigate("/")
        }
        
      } catch (error) {
      // const errorMessage = error?.response?.data?.message || "An error occurred";
      const errorMessage = "password is not correct !!";
      toast.error(errorMessage);
      }
    
  }
  return (
    <div className='mt-5'>
     <div className='bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto '>
      <div className='w-fit mx-auto mb-2'>
      {/* <PiUserCircle  size={80}/> */}
      <Avatar 
      width={70}
      height={70}
      name={location?.state?.name}
      imageUrl={location?.state?.profile_pic}
      />
       <h2 className='font-semibold text-xl  mt-1 '>{location?.state?.name} </h2>
      </div>
      <h3>
        welcome to chat application !!  
      </h3>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
           
            <div className='flex flex-col'>
              <label htmlFor='password'>Password : </label>
              <input
              type='password'
              id='password'
              name='password'
              placeholder='enter your password'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required

              />
            </div>
            
            
            <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
            Login
            </button>
          </form>
          <p className='my-3 text-center'>New User  ? <Link to={"/forgot-password"} className='hover:text-primary font-semibold '>Forgot Password</Link> </p>
     </div>
    </div>
  )
}

export default CheckPasswordPage
