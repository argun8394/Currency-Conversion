"use strict"
/* ------------------------------------------------------- */
// Auth Controller:

const jwt = require('jsonwebtoken')
const User = require('../models/user')
// const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    login: async (req, res) => {
       
        const { username, email, password } = req.body

        if ((username || email) && password) {

            const user = await User.findOne({ $or: [{ username }, { email }] })

            if (user && user.password == passwordEncrypt(password)) {

                if (user.is_active) {
        
                   //JWT:
                   const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '60m' }) 
                    const refreshToken = jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' })

                    res.send({
                        error: false,                     
                        bearer: { accessToken, refreshToken },
                        user,
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username/email or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username/email and password.')
        }
    },

    refresh: async (req, res) => {
        
        const refreshToken = req.body?.bearer?.refreshToken

        if (refreshToken) {

            jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {

                if (err) {

                    res.errorStatusCode = 401
                    throw err
                } else {

                    const { _id, password } = userData

                    if (_id && password) {

                        const user = await User.findOne({ _id })

                        if (user && user.password == password) {

                            if (user.is_active) {

                                // JWT:
                                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' })

                                res.send({
                                    error: false,
                                    bearer: { accessToken }
                                })

                            } else {

                                res.errorStatusCode = 401
                                throw new Error('This account is not active.')
                            }
                        } else {

                            res.errorStatusCode = 401
                            throw new Error('Wrong id or password.')
                        }
                    } else {

                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }
                }
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter token.refresh')
        }
    },

    logout: async (req, res) => {
      
        const auth = req.headers?.authorization || null // Token ...tokenKey... // Bearer ...accessToken...
        const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

        let message = null, result = {}

        if (tokenKey) {

            message = 'No need any process for logout. You must delete JWT tokens.'          
        }

        res.send({
            error: false,
            message,
            result
        })
    },
      
}