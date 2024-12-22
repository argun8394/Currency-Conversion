"use strict"

//JWT
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const auth = req.headers?.authorization || null // get Authorization
    const accessToken = auth ? auth.split(' ')[1] : null // get JWT

    jwt.verify(accessToken, process.env.ACCESS_KEY, function (err, user) {
        if (err) {
            req.user = null
            console.log('JWT Login: NO')
        } else {          
            req.user = user
            console.log('JWT Login: YES')
        }
    })
    next()
}