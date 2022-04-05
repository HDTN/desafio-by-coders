const { Router } = require('express')

const router = Router()

router.use('/transaction', require('./transaction'))
router.use('/balance', require('./balance'))
router.use('/auth', require('./auth'))


module.exports = router