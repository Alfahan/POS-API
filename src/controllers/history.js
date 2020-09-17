const historyModel = require('../models/history')
const response = require('../helpers/response')
const { success } = require('../helpers/response')

const history = {
        insert: async(req,res)=>{
            const body = req.body
            historyModel.insertMaster(body)
            .then((response)=>{
                const idMaster = response.insertId
                const insertDetail = body.detail.map((e)=>{
                    e.idhistory = idMaster
                    historyModel.insertDetail(e)
                })
                Promise.all(insertDetail)
                .then(()=>{
                    success(res, response, 'Insert Transaksi Success')
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
    }


module.exports = history