import React, { useState } from 'react'
import { closeIcon } from "react-icons/io";

const RegisterPage = () => {

  const [data,setdata]=useState({
    name:"",
    email:"",
    password:"",
    profile_pic:""

  })
  const [uploadPhoto,setUploadPhoto]=useState("")

  const handleOnChange =(e)=>{
     const {name,value} = e.target
     setdata((preve)=> {
        return {
          ...preve,
          [name]:value
        }
     })
  }
  const handleUploadPhoto =(e)=>{
    const file =e.target.files[0]
    setUploadPhoto(file)
  }

  console.log("uploadphoto",uploadPhoto)

  return (

    <div className='mt-5'>
     <div className='bg-white w-full max-w-sm rounded overflow-hidden p-4'>
      <h3>
        welcome to chat application !!  
      </h3>

          <form className='grid gap-4 mt-5 '>
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
              type='Email'
              id='Email'
              name='Email'
              placeholder='enter your Email'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.Email}
              onChange={handleOnChange}
              required

              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='Password'>Password : </label>
              <input
              type='Password'
              id='Password'
              name='Password'
              placeholder='enter your Password'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.profile_pic}
              onChange={handleOnChange}
              required

              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='profile_pic'>Photu : 

                <div className='h-14 bg-slate-100 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                  <p className='text-sm'>
                    {
                      uploadPhoto.name ? uploadPhoto?.name : "Upload profile photo "
                    }
                  </p>
                  <button>
                    <closeIcon/>
                  </button>

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
          </form>
     </div>
    </div>
  )
}

export default RegisterPage
