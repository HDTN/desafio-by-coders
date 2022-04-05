const balance_dao = require('../dao/balance')

const select = async (req, res) => {
    try{
        balance_dao.select(req.params)
            .then((result) => {
                if(result.length > 0){
                   return res.status(200).json({balance: result, status: 200})
                }else{
                   return res.status(204).json({balance: [], message: 'No Content', status: 204})
                }
            })
            .catch(e => {
                return res.status(500).json({message: e, status: 500})
            })
    }catch(e){
        console.log(e)
    }
}


module.exports = {
    select,
}