const tracker=(req, res)=>{

    const uid = req.cookies?.uid

    if(!uid){
        return res.json({
            msg: "user not logged in",
            loggedIn: false
        })
    }else{
        return res.json({
            msg: "user is logged in",
            loggedIn: true
        })
    }

}


module.exports= tracker