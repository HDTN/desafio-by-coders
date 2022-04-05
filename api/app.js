const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')

require('dotenv').config()
require('./src/passport-auth/googleSSO')

app = express()

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "5mb", extended: true }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true}))

app.use('/api', require('./src/routes/index'))

module.exports = { app } 