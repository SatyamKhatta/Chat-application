const url = `https://api.cloudinary.com/v1_1/${process.env.React_app_cloudinary_cloud_name}/:auto/upload`

const uploadFile = async(file)=>{
    const formData = new FromData()
    formData.append('file',file)
    formData.append("upload_present","chat-app-file")

    const response = await fetch(url,{
        body:formData
    })
    const responseData=  await response.json()
     
    return responseData
}