const usersModel = require('../models/users')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const { success, failed, tokenResult } = require('../helpers/response')
const environment = require('../helpers/env')
const jwt = require('jsonwebtoken')

const users = {
    register:async(req, res) => {
        try {
            const body = req.body
            const salt = await bcrypt.genSalt(10)
            const newhashPassword = await bcrypt.hash(body.password, salt)

            const data = {
                email: body.email,
                nameuser: body.nameuser,
                password: newhashPassword,
                status: body.status,
                level: body.level,
                refreshToken: body.refreshToken
            }

            usersModel.register(data)
            .then((result)=>{
                // response.success(res,result, `Insert Users Success`)
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    login:async(req,res) => {
        try {
            const body = req.body
            usersModel.login(body)
            .then(async(result)=>{
                const results = result[0]
                const password = results.password
                const userRefreshToken = results.refreshToken
                const isMatch = await bcrypt.compare( body.password, password)
                if (isMatch){
                    jwt.sign(
                        {
                            email: results.email,
                            level: results.level
                        },
                        environment.JWTSecreet,
                        {expiresIn:3600},
                        (err,token) => {
                            if(err){
                                console.log(err)
                            }else{
                                if(userRefreshToken === null){
                                    const id = results.iduser
                                    const refreshToken = jwt.sign({ id }, 'Refresh Token123456')
                                    usersModel.updateRefreshToken(refreshToken,id)
                                    .then(()=>{
                                        const data = {
                                            token:token,
                                            refreshToken: refreshToken
                                        }
                                        tokenResult(res, data, 'Login Success')
                                    })                    
                                    .catch((err)=>{
                                        response.failed(res,[], err.message)
                                    })
                                }else{
                                    const data = {
                                        token:token,
                                        refreshToken: userRefreshToken
                                    }
                                    tokenResult(res, data, 'Login Success')
                                }
                            }
                        }
                    )
                }else{
                    failed(res,[],'Login Failed')
                }
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    renewToken:(req,res)=>{
        const refreshToken = req.body.refreshToken
        usersModel.checkRefreshToken(refreshToken).then((result)=>{
            if(result.length >=1){
                const user = result[0];
                const newToken = jwt.sign(
                    {
                        email: user.email,
                        level: user.level
                    },
                    environment.JWTSecreet,
                    {expiresIn: 3600}
                )
                const data = {
                    token: newToken,
                    refreshToken: refreshToken
                }
                tokenResult(res,data,'The token has been refreshed successfully ')
            }else{
                failed(res,[], 'Refresh token not found')
            }
        }).catch((err)=>{
            response.failed(res,[], err.message)
        })
    },
    logout:(req,res)=>{
        try {
            const destroy = req.params.iduser
            // console.log(destroy)
            usersModel.logout(destroy)
            .then((result)=>{
                response.success(res,result, `Logout Success`)
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    getall:(req,res) =>{
        try {
            usersModel.getall()
            .then((result) =>{
                response.success(res, result, 'Get all Users Success')
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    getDetail:(req,res) =>{
        try {
            const id = req.params.iduser
            usersModel.getDetail(id)
            .then((result)=> {
                response.success(res, result, 'Get Detail User Success')
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[], 'Internal Server Error')
        }
    },
    update:async(req,res)=>{
        try {
            const id = req.params.iduser
            const body = req.body
            const salt = await bcrypt.genSalt(10)
            const newhashPassword = await bcrypt.hash(body.password, salt)

            const data = {
                email: body.email,
                nameuser: body.nameuser,
                password: newhashPassword,
                status: body.status,
                level: body.level
            }

            usersModel.update(data,id)
            .then((result)=>{
                response.success(res, result, 'Update User Success')
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res, [], 'Internal Server Error')
        }   
    },
    delete:(req,res) =>{
        try {
            const id = req.params.iduser
            usersModel.delete(id)
            .then((result)=>{
                response.success(res, result, 'Delete User Success')
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })
        } catch (error) {
            response.failed(res, [], 'Internal Server Error')
        }
    }
}

module.exports = users