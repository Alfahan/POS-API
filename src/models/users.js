const db = require('../configs/db')

    const users = {
        register:(data) =>{
            return new Promise((resolve,reject)=>{
                db.query(`INSERT INTO users SET ?`, data, (err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        login:(data) =>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT * FROM users WHERE email = ?`,data.email , (err , result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        logout:(id) =>{
            return new Promise((resolve,reject)=>{
                db.query(`UPDATE users SET refreshToken=null WHERE iduser='${id}'`, (err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        updateRefreshToken:(token,id)=>{
            return new Promise((resolve,reject)=>{
                db.query(`UPDATE users SET refreshToken='${token}' WHERE iduser='${id}'` , (err , result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        checkRefreshToken:(refreshToken) =>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT *FROM users WHERE refreshToken='${refreshToken}'`,(err, result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        getall:() =>{
            return new Promise((resolve,reject)=>{
                db.query (`SELECT * FROM users`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            }) 
        },
        getUsers:(data) =>{
            return new Promise((resolve,reject)=>{
                db.query(`UPDATE users SET status=1 WHERE email='${data}'`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        getDetail:(id) =>{
            return new Promise((resolve, reject)=>{
                db.query(`SELECT *FROM users WHERE iduser='${id}'`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        }, 
        update:(data,id) =>{
            return new Promise((resolve,reject)=>{
                db.query(`UPDATE users SET ? WHERE iduser = ? `,[data,id],(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        delete:(id) =>{
            return new Promise((resolve,reject)=>{
                db.query(`DELETE FROM users WHERE iduser='${id}'`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        }
    }

module.exports = users