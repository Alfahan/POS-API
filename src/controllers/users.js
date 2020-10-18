const usersModel = require('../models/users')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const { JWTSecreet, emaill, passwordd, url } = require('../helpers/env')
const jwt = require('jsonwebtoken')
const mailer = require('nodemailer')
const { failed } = require('../helpers/response')


const users = {
    // Register
    register:async(req, res) => {
        try {
            const body = req.body
            const salt = await bcrypt.genSalt(10)
            const newhashPassword = await bcrypt.hash(body.password, salt)

            const data = {
                email: body.email,
                nameuser: body.nameuser,
                password: newhashPassword,
                status: 0,
                level: 1,
                refreshToken: null
            }

            usersModel.register(data)
            .then(()=>{
                const newhashPassword = jwt.sign({
                    email: data.email,
                    nameuser: data.nameuser
                }, JWTSecreet)

                let transporter = mailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth:{
                        user: emaill,
                        pass: passwordd
                    }
                })

                let mailOptions = {
                    from    : 'MAKAN ENAK' + emaill,
                    to      : data.email,
                    subject : `Hello ${data.email} `,
                    html    :
                    ` Hai <h1><b>${data.nameuser}</b></h1>
                    PLEASE ACTIVATE YOUR EMAIL ! <br>
                    Klik -->
                    <a href="${url}users/verify/${newhashPassword}">Activation</a> <--`
                }

                transporter.sendMail(mailOptions,(err, result) =>{
                    if(err){
                        res.status(505)
                        response.failed(res,[], err.message)
                    } else {
                        response.success(res, [result], 'Send Mail Success')
                    }
                })

                res.json({
                    message: `Success Resgistration, Please Activation your Email!`
                })
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    verify:(req,res) =>{
        const token = req.params.token
        if(token) {
            jwt.verify(token, JWTSecreet,(err,decode) =>{
                if(err){
                    res.status(505)
                    response.failed(res, [], `Failed Activation`)
                }else{
                    const email = decode.email
                    usersModel.getUsers(email)
                    .then((result)=>{
                        if(result.affectedRows){
                            res.status(200)
                            res.render('index', {email})
                        }else{
                            res.status(505)
                            response.failed(res, [], err.message)
                        }
                    })
                    .catch((err)=>{
                        res.status(505)
                        response.failed(res, [], err.message)
                    })
                }
            })
        }
    },
    // Login
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
                    if(results.status === 1){
                        jwt.sign(
                            {
                                email: results.email,
                                nameuser: results.nameuser,
                                level: results.level
                            },
                            JWTSecreet,
                            {expiresIn:5},

                            (err,token) => {
                                if(err){
                                    console.log(err)
                                }else{
                                    if(userRefreshToken === null){
                                        const id = results.iduser
                                        const refreshToken = jwt.sign({ id }, JWTSecreet)
                                        usersModel.updateRefreshToken(refreshToken,id)
                                        .then(()=>{
                                            const data = {
                                                iduser  : id,
                                                nameuser: results.nameuser,
                                                level   : results.level,
                                                token   :token,
                                                refreshToken   : refreshToken
                                            }
                                            response.tokenResult(res, data, 'Login Success')
                                        })                    
                                        .catch((err)=>{
                                            response.failed(res,[], err.message)
                                        })
                                    }else{
                                        const data = {
                                            iduser  : results.iduser,
                                            nameuser: results.nameuser,
                                            level   : results.level,
                                            token   : token,
                                            refreshToken   : userRefreshToken
                                        }
                                        response.tokenResult(res, data, 'Login Success')
                                    }
                                }
                            }
                        )
                    } else {
                        failed(res, [], 'Need Activation')
                    }
                }else{
                    response.failed(res,[],'Incorrect password! please try again')
                }
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    // RenewToken
    renewToken:(req,res)=>{
        const refreshToken = req.body.refreshToken
        usersModel.checkRefreshToken(refreshToken)
        .then((result)=>{
            if(result.length >=1){
                const user = result[0];
                const newToken = jwt.sign(
                    {
                        email: user.email,
                        nameuser: user.nameuser,
                        level: user.level
                    },
                    JWTSecreet,
                    {expiresIn: 3600}
                )
                const data = {
                    token: newToken,
                    refreshToken: refreshToken
                }
                response.tokenResult(res,data,'The token has been refreshed successfully ')
            }else{
                response.failed(res,[], 'Refresh token not found')
            }
        }).catch((err)=>{
            response.failed(res,[], err.message)
        })
    },
    // Logout
    logout:(req,res)=>{
        try {
            const destroy = req.params.iduser
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
    },
 
}

module.exports = users