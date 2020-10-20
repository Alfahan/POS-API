const db = require('../configs/db')

    const history = {
        getall: () =>{
            return new Promise((resolve ,reject) => {
                db.query(`SELECT *FROM history JOIN detailhistory ON history.idhistory = detailhistory.idhistory`, (err,result) => {
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        getDetail: () => {
            return new Promise((resolve ,reject) => {
                db.query(`SELECT *FROM history INNER JOIN users ON history.iduser = users.iduser`, (err,result) => {
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
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