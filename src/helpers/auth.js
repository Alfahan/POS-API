const jwt = require('jsonwebtoken')
const response = require('../helpers/response')
const environment = require('../helpers/env')

const auth = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if(token === undefined || token === ''){
            response.tokenResult(res, [], 'Token is Empty')
        }else{
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token,environment.JWTSecreet, (err,decoded) => {
            if(err && err.name === 'TokenExpiredError'){
                response.tokenExpired(res,[], 'Authorization Failed, Token Expired')
            }else if(err && err.name === 'JsonWebTokenError'){
                response.tokenResult(res, [], 'Authorization Failed, Token is Wrong')
            }else{
                next()
            }
        })
    },
    authorizationAdmin: (req,res,next) =>{
        const token = req.headers.token 
        jwt.verify(token,environment.JWTSecreet, (err,decoded)=>{
            if(err && err.name === 'TokenExpiredError'){
                response.tokenExpired(res,[], 'Authorization Failed, Token Expired')
            }else if(err && err.name === 'JsonWebTokenError'){
                response.tokenResult(res, [], 'Authorization Failed, Token is Wrong')
            }else{
                if(decoded.level === 0){
                    response.tokenResult(res, [], 'Authorization Failed, This is admin access')
                }else{
                    next()
                }
            }
        })
    }
}


module.exports= auth