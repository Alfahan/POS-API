const productModel = require('../models/product')
const response = require('../helpers/response')

const upload = require('../helpers/upload')

const redis = require('redis')

const redisClient = redis.createClient()

const product = {
    getAll: (req,res) =>{
        try {
            const name = !req.query.nameproduct ? '' : req.query.nameproduct
            const typesort = !req.query.typesort ? 'ASC' : req.query.typesort
            const by = !req.query.by ? 'idproduct' : req.query.by
            const limit = !req.query.limit? 10 : parseInt(req.query.limit)
            const page = !req.query.page? 1 : parseInt(req.query.page)
            const offset = page=== 1 ? 0 : (page-1)*limit
    
            productModel.getAll(name,by,typesort,limit,offset)
            .then((result)=>{
                
                redisClient.set('product',JSON.stringify(result)) //save to redis

                const totalRows = result[0].count
                const meta={
                    totalRows:totalRows,
                    totalPage:Math.ceil(totalRows/limit),
                    page
                }
                response.successWithMeta(res,result,meta,'Get all Product Success')
            })
            .catch((err)=>{
                 response.failed(res, [], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    getDetail: (req,res) => {
        try {
            const id = req.params.idproduct
            productModel.getDetail(id)
            .then((result)=>{
                response.success(res,result, `Get Detail Product Success`)
            })
            .catch((err)=> {
                response.failed(res,[], err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    insert:(req,res) => {
        try {
            upload.single('img')(req,res, (err)=> {
                if (err){
                    if(err.code === 'LIMIT_FILE_SIZE'){
                        response.failed(res,[], 'Image size is too big! Please upload another one with size <200kb')
                    }else{
                        response.failed(res,[], err)
                    }
                } else {
                    const body = req.body
                    body.img = req.file.filename
                    productModel.insert(body)
                    .then((result)=>{
                        redisClient.del('product')
                        response.success(res,result, `Insert Product Success`)
                    })
                    .catch((err)=>{
                        response.failed(res,[], err.message)
                    })
                }
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    update:(req,res) =>{
        try {
            upload.single('img')(req,res, (err)=>{
                if(err){
                    if(err.code === 'LIMIT_FILE_SIZE'){
                        response.failed(res,[], 'Image size is too big! Please upload another one with size <200kb')
                    }else{
                        response.failed(res,[], err)
                    }
                }else{
                    const id = req.params.idproduct
                    const body = req.body
                    body.img = req.file.filename
                    productModel.update(body,id)
                    .then((result)=>{
                        redisClient.del('product')
                        response.success(res,result, `Update Product Success`)
                    })
                    .catch((err)=>{
                        response.failed(res,[],err.message)
                    })
                }
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    },
    updatePatch:(req,res) =>{
        try {
            upload.single('img')(req,res,(err)=>{
                if(err){
                    if(err.code === 'LIMIT_FILE_SIZE'){
                        response.failed(res,[], 'Image size is too big! Please upload another one with size <200kb')
                    }else{
                        response.failed(res,[], err)
                    }
                }else{
                    const id = req.params.idproduct;
                    const data = req.body
                    data.img = !req.file ? '': req.file.filename
                    productModel.updatePatch(data, id)
                    .then(result => {
                        redisClient.del('product')
                        response.success(res, result, 'Update Product Success');
                    }).catch(err => {
                        response.failed(res, [], err.message);
                    })
                }
            })
        } catch (error) {
            response.failed(res,[],`Internal Server Error`)
        }
    },
    delete:(req,res) =>{
        try {
            const id = req.params.idproduct
            productModel.delete(id)
            .then((result)=>{
                redisClient.del('product')
                response.success(res,result, `Delete Product Success`)
            })
            .catch((err)=>{
                response.failed(res,[],err.message)
            })
        } catch (error) {
            response.failed(res,[], `Internal Server Error`)
        }
    }
}

module.exports = product