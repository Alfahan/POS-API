const auth = (req,res,next) =>{
    const token = req.headers.token
    if(token === '@lfa'){
        next()
    }else{
        res.json({
            msg: `Gagal melewati middleware`
        })
    }
}

module.exports= auth