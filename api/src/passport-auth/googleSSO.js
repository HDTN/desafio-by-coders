const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const user_dao = require('../dao/user')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3333/api/auth/google/callback',
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {
    const userData = {
        google_id: profile.id,
        nome: profile.name.givenName,
        email: profile.emails[0].value,
        foto: profile.photos[0].value
    }

    const user = await user_dao.insertOrUpdate(userData)
        .then(result => result)
        .catch(error => console.log(error))

    if(user && user[0]) return cb(null, user && user[0])
}))

passport.serializeUser((user, cb) => {
    cb(null, user.google_id)
})

passport.deserializeUser(async (id, cb) => {
    const user = await user_dao.select({google_id: id})
        .then((result) => result)
        .catch((err) => {console.log('error deserializing user: ', err); cb(err, null)})
    if(user && user[0]) return cb(null, user)
})

