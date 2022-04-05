const { Router } = require('express')
const balance_con = require('../controller/balance')

const router = Router()

router.get('/select', async function(req, res){
    balance_con.select(req, res)
})


module.exports = router