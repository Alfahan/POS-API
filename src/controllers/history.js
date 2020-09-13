const historyModel = require('../models/history')
const response = require('../helpers/response')

const history = {
    getAll:(req,res) =>{
        try {
            const idhistory = !req.query.idhistory?'':req.query.invoice
            const typesort = !req.query.typesort ? 'ASC': req.query.typesort
            const by = !req.query.by ? 'idhistory' : req.query.by
            const limit = !req.query.limit?2:parseInt(req.query.limit)
            const page = !req.query.page?1:parseInt(req.query.page)
            const offset = page===1?0:(page-1)*limit
            historyModel.getAll(idhistory,by,typesort,limit,offset)
            .then((result)=>{
                const totalRows = result[0].count
                const meta = {
                    totalRows:totalRows,
                    totalPage:Math.ceil(totalRows/limit),
                    page
                }
                response.successWithMeta(res,result,meta,`Get all History Success`)
            })
            .catch((err)=>{
                response.failed(res, [], err.message)
            })    
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    getDetail:(req,res)=>{
        try {
            const id = req.params.idhistory
            historyModel.getDetail(id)
            .then((result)=>{
                response.success(res,result, `Get Detail History Success`)
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`) 
        }
    },
    insert:(req,res)=>{
        try {
            const body = req.body
            historyModel.insert(body)
            .then((result)=>{
                response.success(res,result, `Insert Invoice Success`)
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    update:(req,res)=>{
        try {
            const id = req.params.invoice
            const body = req.body
            historyModel.update(body,id)
            .then((result)=>{
                response.success(res,result, `Update Invoice Success`)
            })
            .catch((err)=>{
                response.failed(res,[],err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    updatePatch:(req,res)=>{
        try {
            const id = req.params.invoice
            const data = req.body
            historyModel.updatePatch(data , id)
            .then((result)=>{
                response.success(res,result, `Update Invoice Success`)
            })
            .catch((err)=>{
                response.failed(res,[],err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    delete:(req,res)=>{
        try {
            const id = req.params.idhistory
            historyModel.delete(id)
            .then((result)=>{
                response.success(res,result,`Delete Invoice Success`)
            })
            .catch((err)=>{
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    }

} 

module.exports = history