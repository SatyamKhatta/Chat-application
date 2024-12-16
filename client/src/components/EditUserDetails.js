import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFiles'
import Divider from './Divider'
import axios from 'axios'
import  toast from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const EditUserDetails = ({onClose,user}) => {
    const [data,setData]=useState({
        // name : user?.user,
        name : user?.name || '',
        // profile_pic : user?.user 
        profile_pic : user?.profile_pic || '' 
    })
    const uploadPhotoref=useRef()
    const dispatch=useDispatch()

useEffect(()=>{
    setData((prev)=>{
       return {
        ...prev,
        ...user
       }
    })
},[user])
    
    const handleOnChange = (e)=>{
        const {name,value } = e.target

        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })

    }
    const handleOpenUploadPhoto = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        uploadPhotoref.current.click()
    }
    // const handleUploadPhoto =async(e)=>{
    //     const file =e.target.files[0]
    
    //     const uploadPhoto = await uploadFile(file)
    //     console.log("uploadphoto in edit user ", uploadPhoto)
    //     setData((preve)=>{
    //       return {
    //         ...preve,
    //         profile_pic:uploadPhoto?.url
    //       }
    //     })
    //   }
    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];
        const uploadPhoto = await uploadFile(file);
        if (uploadPhoto?.url) {
            setData((prev) => ({
                ...prev,
                profile_pic: uploadPhoto.url,
            }));
        } else {
            toast.error('Failed to upload photo');
        }
    };
    

   const handleSubmit=async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log("Data to submit:", data); // Debugging log
    try {
        const URL= `${process.env.REACT_APP_BACKEND_URL}/api/updateUser`
        const response= await axios({
            method:'put',
            url : URL,
            data : data,
            withCredentials:true

        })

        toast.success(response.data.message)
         
    //     if(response.data.success){
    //         dispatch(setUser(response.data.data))
    //         onClose()
    //     }
        
    // } catch (error) {
        
    //     toast.error(error?.response?.data?.message || " error in edit section")
    // }

            if (response.data.success) {
                console.log("Response from backend:", response.data); // Debugging response
                dispatch(setUser(response.data.data)); // Update Redux state

                // Close modal only after Redux update
                toast.success(response.data.message);
                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during update:", error.response?.data || error.message);
            toast.error(error?.response?.data?.message || 'Error in edit section');
        }
        }   
    
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
     <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>profile details</h2>
        <p className='text-sm'> Edit user details</p>

        <form className='grid gap-3 mt-3 'onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>
                    Name:
                </label>
                <input
                type='text'
                name='name'
                id='name'
                value={data.name}
                onChange={handleOnChange}  
                className='w-full py-1 px-2 focus:outline-primary border-0.5'
               />
            </div>

           <div>
            <div>Photo</div>
            <div className='my-1 flex items-center gap-4'>
                <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}/>
                  
                  <label htmlFor='profile_pic'>
                <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
                <input
                type='file'
                className='hidden'
                onChange={handleUploadPhoto}
                ref={uploadPhotoref}
                />
                </label>

            </div>
           </div>
           <Divider/>
            <div onClick={onClose} className=' flex gap-2 w-fit ml-auto '>
            <button className='border-primary text-primary border px-4 py-1 rounded hover:bg-primary hover:text-white '>Cancel</button>
            <button onClick={handleSubmit}  className='border-primary bg-primary text-white border px-4 py-1 rounded   '>Save</button>

           </div>
        </form>
     </div>
    </div>
  )
}

export default React.memo(EditUserDetails)
