import React, { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFiles';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {

  const [data,setdata]=useState({
    name:"",
    email:"",
    password:"",
    profile_pic:""

  })
  const [uploadPhoto,setUploadPhoto]=useState("")
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
  const handleUploadPhoto =async(e)=>{
    const file =e.target.files[0]

    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file)
    setdata((preve)=>{
      return {
        ...preve,
        profile_pic:uploadPhoto?.url
      }
    })
  }


  const handleClearUploadPhoto =(e) =>{

    e.stopPropagation()
    
    e.preventDefault()
    setUploadPhoto(null)

  }

  const handleSubmit =async(e)=>{
      e.preventDefault()
      e.stopPropagation()
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
      try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
          setdata({
            name:"",
            email:"",
            password:"",
            profile_pic:""
        
          })
          navigate("/email")
        }
        
      } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
      }
      console.log("data",data)
  }

  return (

    <div className='mt-5'>
     <div className='bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto'>
      <h3>
        welcome to chat application !!  
      </h3>

          <form className='grid gap-4 mt-5 ' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='name'>Name : </label>
              <input
              type='text'
              id='name'
              name='name'
              placeholder='enter your name'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.name}
              onChange={handleOnChange}
              required

              />
            </div>
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
            <div className='flex flex-col'>
              <label htmlFor='password'>Password : </label>
              <input
              type='password'
              id='password'
              name='password'
              placeholder='enter your Password'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required

              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='profile_pic'>Photu : 

                <div className='h-14 bg-slate-100 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                  <p className='text-sm'>
                    {
                      uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo "
                    }
                  </p>
                  {
                    uploadPhoto?.name && (
                      <button className='text-xl ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                      <IoMdCloseCircle/>
                    </button>
                    )
                  }
                 

                </div>
              </label>  
              <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-2 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
              />
            </div>
            <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
              Register
            </button>
          </form>
          <p className='my-3 text-center'>Already have an account ? <Link to={"/email"} className='hover:text-primary font-semibold '>Login</Link> </p>
     </div>
    </div>
  )
}

export default RegisterPage
