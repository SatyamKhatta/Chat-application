async function userDetails(req,res){
    try {
        const token = request.cookies.token || "";
        
    } catch (error) {

        return res.status(500).json({
            message : error.message || error,
            error: true,
            
        })
    }
}