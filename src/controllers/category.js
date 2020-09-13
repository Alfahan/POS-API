const categoryModel = require('../models/category')
const response = require('../helpers/response')

const category = {
    getAll: (req,res) =>{
        try {
            const name = !req.query.namecategory?'': req.query.namecategory
            const typesort = !req.query.typesort ? 'ASC': req.query.typesort
            const by = !req.query.by ? 'idcategory' : req.query.by
            const limit = !req.query.limit?10:parseInt(req.query.limit)
            const page = !req.query.page?1:parseInt(req.query.page)
            const offset = page===1?0:(page-1)*limit
            categoryModel.getAll(name,by,typesort,limit,offset)

            .then((result)=>{
                const totalRows=result[0].count
                const meta = {
                    totalRows:totalRows,
                    totalPage:Math.ceil(totalRows/limit),
                    page
                }
                response.successWithMeta(res,result,meta,`Get all Category Success`)
            })
            .catch((err)=>{
                response.failed(res,[],err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    getDetail: (req,res) =>{
        try {
            const id = req.params.idcategory
            categoryModel.getDetail(id)
            .then((result)=>{
                response.success(res,result, `Get Detail Category Success`)
            })
            .catch((err)=>{
                response.failed(res,[],err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    insert: (req,res)=>{
        try {
            const body = req.body
            categoryModel.insert(body)
            .then((result)=>{
                response.success(res,result, `Insert Category Success`)
            })
            .catch((err)=>{
                response.failed(res,[],err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    update: (req, res)=>{
        try {
            const id = req.params.idcategory
            const body = req.body
            categoryModel.update(body,id)
            .then((result)=>{
                response.success(res,result,`Update Category Success`)
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
            const id = req.params.idcategory
            const data = req.body
            categoryModel.updatePatch(data,id)
            .then((result)=>{
                response.success(res,result,`Update Category Success`)
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
            const id = req.params.idcategory
            categoryModel.delete(id)
            .then((result)=>{
                response.success(res,result,`Delete Category Success`)
            })
            .catch((err)=>{
                response.failed(res,[],err.message)
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    }
}

module.exports = category