import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';
const Avatar = ({userId,imageUrl,width,height,name}) => {

    const onlineUser = useSelector(state => state?.user?.onlineUser)

    let avatarname= ""
    if(name){
        const splitname = name?.split(" ")
        if(splitname.length > 1) {
            avatarname = splitname[0][0] + splitname[1][0]
        }
        else{
            avatarname = splitname[0][0]    
        }
    }

    const bgcolour=[
        'bg-slate-200',
        'bg-teal-200',
        'b-red-500',
        'bg-green-200',
        'bg-yellow-200',
        'bg-green-500'
    ]
    

    // used for changing the background color
    const randomcolor= Math.floor(Math.random()*6)
    const isOnline = onlineUser.includes(userId)
    
  return (
    <div className={`text-slate-800  rounded-full  text-xl font-bold relative` }style={{width : width+"px", height : height+"px",}}>
            {
                imageUrl ? (
                    <img 
                    src={imageUrl}
                    width={width}
                    height={height}
                    alt={name}
                    className='overflow-hidden rounded-full'
                    />
                ) : (
                    name ? (
                        <div style={{width : width+"px", height : height+"px",}} className={`overflow-hidden rounded-full flex justify-center items-center  ${bgcolour[randomcolor]}`}>  
                         {avatarname}
                        </div>
                    ) : (
                        <PiUserCircle  size={width}/>
                    )
                )
            }
            {
                isOnline && (
                    <div className='bg-green-600 p-1 absolute -right-1 bottom-0 z-10 rounded-full'></div>
                )
            }
            
      
    </div>
  )
}

export default Avatar
