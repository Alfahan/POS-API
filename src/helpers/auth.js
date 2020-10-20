const jwt = require('jsonwebtoken')
const response = require('../helpers/response')
const environment = require('../helpers/env')

const auth = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if(token === "undefined" || token === ''){
            response.tokenResult(res, [], 'Token undetected. Please insert token!')
        }else{
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token,environment.JWTSecreet, (err,decoded) => {
            if(err && err.name === 'TokenExpiredError'){
                response.tokenResult(res,[], 'Token Expired! Please log in again')
            }else if(err && err.name === 'JsonWebTokenError'){
                response.tokenResult(res, [], 'Authorization Failed!')
            }else{
                next()
            }
        })
    }
}

module.exports= auth