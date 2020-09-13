const db = require('../configs/db')

    const history = {
        getAll:(idhistory,by,typesort,limit,offset)=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT *, (SELECT COUNT(*)FROM history) AS count FROM history WHERE idhistory LIKE '%${idhistory}%' ORDER BY ${by} ${typesort} LIMIT ${offset},${limit}`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        getDetail:(id)=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT *FROM history WHERE idhistory='${id}'`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        insert:(data)=>{
            return new Promise((resolve,reject)=>{
                db.query(`INSERT INTO history (invoice,cashier,date,orders,amount) VALUES
                ('${data.invoice}','${data.cashier}','${data.date}','${data.orders}','${data.amount}')`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        update:(data,id)=>{
            return new Promise((resolve,reject)=>{
                db.query(`UPDATE history SET
                idhistory='${data.idhistory}', 
                cashier='${data.cashier}',
                date='${data.date}',
                orders='${data.orders}',
                amount='${data.amount}'
                WHERE invoice = '${id}'
                 `,(err,result)=>{
                     if(err){
                        reject(new Error(err))
                     }else{
                        resolve(result)
                     }
                 })
            })
        },
        updatePatch:(data,id)=>{
            return new Promise((resolve,reject)=>{
                db.query(`UPDATE history SET ? WHERE idhistory = ?`,[data,id],(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        delete:(id)=>{
            return new Promise((resolve,reject)=>{
                db.query(`DELETE FROM history WHERE idhistory='${id}'`,(err,result)=>{
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