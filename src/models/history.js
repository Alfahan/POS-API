const db = require('../configs/db')
const { reject } = require('lodash')

    const history = {
         insertMaster: (data)=>{
             return new Promise((resolve, reject)=>{
                 db.query(`INSERT INTO history(invoice,ppn,amount,iduser) 
                 VALUES ('${data.invoice}','${data.ppn}','${data.amount}','${data.iduser}')`, (err,result)=>{
                     if(err){
                         reject(new Error(err))
                     }else{
                         resolve(result)
                     }
                 })
             })
         },
         insertDetail: (data)=>{
            return new Promise((resolve, reject)=>{
                db.query('INSERT INTO detailhistory SET ?', data, (err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        }
    }

module.exports = history