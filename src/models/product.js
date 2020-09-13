const db = require('../configs/db')
const { response } = require('express')
const fs = require('fs')

    const product = {
        getAll: (name,by,typesort,limit,offset) =>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT *,(SELECT COUNT(*)FROM product) AS count FROM product WHERE nameproduct LIKE '%${name}%' ORDER BY ${by} ${typesort} LIMIT ${offset}, ${limit}   `,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        getDetail : (id) =>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT *FROM product WHERE idproduct='${id}'`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        insert : (data) =>{
            return new Promise((resolve,reject)=>{
                db.query(`INSERT INTO product (nameproduct,price,img,idcategory) VALUES
                ('${data.nameproduct}','${data.price}','${data.img}','${data.idcategory}')`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })

            })
        },
        update : (data,id)=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT *FROM product WHERE idproduct='${id}'`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(new Promise((resolve,reject)=>{
                            let imagename = null
                            if(!data.img){
                                imagename = result[0].img;
                            }else{
                                imagename = data.img;
                                fs.unlink(`src/uploads/${result[0].img}`,(err)=>{
                                    if(err) throw err;
                                    console.log('Update data success')
                                })
                            }
                            db.query(`UPDATE product SET 
                                 nameproduct         ='${data.nameproduct}',
                                 price               ='${data.price}',
                                 img                 ='${imagename}',
                                 idcategory          ='${data.idcategory}'
                                 WHERE idproduct     ='${id}'
                                `,(err,result)=>{
                                if(err){
                                    reject(new Error(err))
                                }else{
                                    resolve(result)
                                }
                            })
                        }))
                    }
                })
            })
        },
        updatePatch :(data,id)=>{
            return new Promise((resolve, reject) => {
                if(!data.img) {
                    db.query(`SELECT * FROM product WHERE idproduct = ${id}`, (err, result) => {
                        if(err) {
                            reject(new Error(err));
                        }else {
                            resolve(new Promise((resolve, reject) => {
                                data.img = result[0].img;
                                db.query(`UPDATE product SET ? WHERE idproduct = ?`, [data, id], (err, result) => {
                                    if(err) {
                                        reject(new Error(err));
                                    }else {
                                        resolve(result);
                                    }
                                })
                            }))
                        }
                    })
                }else {
                    db.query(`SELECT * FROM product WHERE idproduct=${id}`, (err, result) => {
                        if(err) {
                            reject(new Error(err));
                        }else {
                            resolve(new Promise((resolve, reject) => {
                                fs.unlink(`src/uploads/${result[0].img}`, (err) => {
                                    if(err) throw err;
                                    console.log('Update data success');
                                })
                                db.query(`UPDATE product SET ? WHERE idproduct = ?`, [data, id], (err, result) => {
                                    if(err) {
                                        reject(new Error(err));
                                    }else {
                                        resolve(result);
                                    }
                                })
                            }))
                        }
                    })
                }
            })
        },
        delete : (id) =>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT *FROM product WHERE idproduct=${id}`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(new Promise((resolve,reject)=>{
                            fs.unlink(`src/uploads/${result[0].img}`,(err)=>{
                                if(err) throw err;
                                console.log(`DELETED`);
                            })
                            db.query(`DELETE FROM product WHERE idproduct='${id}'`,(err,result)=>{
                                if(err){
                                    reject(new Error(err))
                                }else{
                                    resolve(result)
                                }
                            })
                        }))
                    }
                })
            })
        }
    }

module.exports = product