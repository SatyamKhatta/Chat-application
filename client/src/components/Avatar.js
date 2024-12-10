import React from 'react'
import { PiUserCircle } from "react-icons/pi";
const Avatar = ({userId,imageUrl,width,height,name}) => {

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
    
  return (
    <div className={`text-slate-800 overflow-hidden rounded-full  text-xl font-bold ` }style={{width : width+"px", height : height+"px",}}>
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
      
    </div>
  )
}

export default Avatar
