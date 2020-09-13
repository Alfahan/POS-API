const db = require('../configs/db')

    const category = {
        getAll: (name,by,typesort,limit,offset) =>{
            return new Promise((resolve,reject)=>{
                db.query (`SELECT *,(SELECT COUNT(*)FROM category) AS count FROM category WHERE namecategory LIKE '%${name}%' ORDER BY ${by} ${typesort} LIMIT ${offset}, ${limit}`,(err,result)=>{
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
                db.query(`SELECT *FROM category WHERE idcategory='${id}'`,(err,result)=>{
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
                db.query(`INSERT INTO category (namecategory) VALUES ('${data.namecategory}')`
                ,(err,result)=>{
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
                db.query(`UPDATE category SET namecategory='${data.namecategory}' WHERE idcategory='${id}'`,(err,result)=>{
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
                db.query(`UPDATE category SET ? WHERE idcategory = ? `,[data,id],(err,result)=>{
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
                db.query(`DELETE FROM category WHERE idcategory='${id}'`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        }
    }


    module.exports = category