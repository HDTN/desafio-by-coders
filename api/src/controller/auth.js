const userInReq = async (req, res) => {
    try{
        return res.status(200).json({user: req.user[0]})
    }catch(e){
        console.log(e)
    }
}

const clearSession = async (req, res) => {
    try{    
        req.session = null
        res.status(204)
        res.end()
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    userInReq,
    clearSession
}