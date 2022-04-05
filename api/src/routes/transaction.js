
const { Router } = require('express')
const transaction_con = require('../controller/transaction')

const router = Router()

router.post('/insert', function(req, res){
    transaction_con.insert(req, res)
})

router.get('/select', function(req, res){
    transaction_con.select(req, res)
})

module.exports = router