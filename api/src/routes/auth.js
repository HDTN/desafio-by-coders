const { Router } = require('express')
const passport = require('passport')
const auth_con = require('../controller/auth')

const router = Router()

router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email']}))

router.get('/google/callback', passport.authenticate('google', { 
        failureMessage: "Can not login with google. Try Again later!",
        successRedirect: process.env.APP_URL + 'login/success',
    }))

router.get('/user', function(req, res){
    auth_con.userInReq(req, res)
})

router.get('/clear-session', function(req, res){
    auth_con.clearSession(req, res)
})


module.exports = router