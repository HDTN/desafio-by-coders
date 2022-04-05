const transaction_dao = require('../dao/transaction')

const insert = async (req, res) => {
    try{
        transaction_dao.insert(req.body)
            .then((result) => {
                if(result.length > 0){
                    return res.status(200).json({status: 200, transactions: result})
                }else{
                    return res.status(500).json({message: 'something wrong', status: 500})
                }
            })
            .catch(e => {
                return res.status(500).json({message: e})
            })
    }catch(e){
        console.log(e)
    }
}

const select = async (req, res) => {
    try{
        const data = {
            user: req.user[0],
            ...req.query
        }
        transaction_dao.select(data)
            .then((result) => {
                if(result.length > 0){
                   return res.status(200).json({transactions: result, status: 200})
                }else{
                   return res.status(204).json({transactions: [], message: 'No Content', status: 204})
                }
            })
            .catch(e => {
                return res.status(500).json({message: e, status: 500})
            })
    }catch(e){
        console.log(e)
    }
}

const balance = async (req, res) => {
    try{
        transaction_dao.balance(req.params)
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
    insert,
    select,
    balance
}