const historyModel = require('../models/history')
const response = require('../helpers/response')
const { success, failed } = require('../helpers/response')

const history = {
        getall: (req, res) => {
            historyModel.getall()
            .then(result => {
                success(res, result, `Get all data success`)
            }).catch(err => {
                failed(res, [], err)
            })
        },
        getDetail: (req, res) => {
            historyModel.getDetail()
            .then(result => {
                success(res, result, `Get all data success`)
            }).catch(err => {
                failed(res, [], err)
            })
        },
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