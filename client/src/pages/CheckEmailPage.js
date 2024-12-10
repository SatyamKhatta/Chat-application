
import React, { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFiles';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";



const CheckEmailPage = () => {
  
  const [data,setdata]=useState({

    email:"",

  })
  const navigate = useNavigate()
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
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`
      try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
          setdata({
            
            email:"",
          
          })
          navigate("/password",{
            state:response?.data?.data
          })
        }
        
      } catch (error) {
      // const errorMessage = error?.response?.data?.message || "An error occurred";
      const errorMessage = "Email is not valid Please Register first !!";
      toast.error(errorMessage);
      }
    
  }
  return (
    <div className='mt-5'>
     <div className='bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto'>
      <div className='w-fit mx-auto mb-2'>
      <PiUserCircle  size={80}/>

      </div>
      <h3>
        welcome to chat application !!  
      </h3>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
           
            <div className='flex flex-col'>
              <label htmlFor='email'>Email : </label>
              <input
              type='email'
              id='email'
              name='email'
              placeholder='enter your Email'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.email}
              onChange={handleOnChange}
              required

              />
            </div>
            
            
            <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
            Let's Go 
            </button>
          </form>
          <p className='my-3 text-center'>New User  ? <Link to={"/register"} className='hover:text-primary font-semibold '>Register</Link> </p>
     </div>
    </div>
  )
}

export default CheckEmailPage
