const redis = require('redis')
const response = require('../helpers/response')
const _ = require('lodash')

const redisClient = redis.createClient()

const pos = {
    getProduct: (req,res, next)=>{
        redisClient.get('product', (err,reply) =>{
            if(reply){
                const data= JSON.parse(reply)
                const name = !req.query.nameproduct ? null : req.query.nameproduct
                const typesort = !req.query.typesort ? 'ASC': req.query.typesort
                const by = !req.query.by ? 'idproduct' : req.query.by
                
                const limit = !req.query.limit? 10 : parseInt(req.query.limit)
                const page = !req.query.page? 1 : parseInt(req.query.page)

                
                // pagination
                const starPage = (page-1) * limit
                const endPage = page * limit

                // Sort 
                const sort = _.orderBy(data, [by], [typesort])
                
                // Redis Data
                let redisData = sort

                if( name !== null ) {
                    const search = sort.filter(e => e.nameproduct.toLowerCase().includes(name.toLowerCase()))
                    redisData = search
                }
                res.send({
                    message: 'Get Product From Redis',
                    code: 200,
                    success:true,
                    meta: {
                        totalRow: redisData.length,
                        totalPage: Math.ceil(redisData.length/limit),
                        page
                    },
                    // pagination
                    data: redisData.slice(starPage, endPage)
                })
            } else{
                next()
            }
        })
    },
    getCategory: (req,res,next)=>{
        redisClient.get('category',(err,reply)=>{
            if(reply){
                const data= JSON.parse(reply)
                const name = !req.query.namecategory ? null : req.query.namecategory
                const typesort = !req.query.typesort ? 'ASC': req.query.typesort
                const by = !req.query.by ? 'idcategory' : req.query.by
                
                const limit = !req.query.limit?5:parseInt(req.query.limit)
                const page = !req.query.page?1:parseInt(req.query.page)
                
                // pagination
                const starPage = (page-1) * limit
                const endPage = page * limit

                // Sort 
                const sort = _.orderBy(data, [by], [typesort])
                
                // Redis Data
                let redisData = sort

                if( name !== null ) {
                    const search = sort.filter(e => e.namecategory.toLowerCase().includes(name.toLowerCase()))
                    redisData = search
                }
                res.send({
                    message: 'Get Category From Redis',
                    code: 200,
                    success:true,
                    meta: {
                        totalRow: redisData.length,
                        totalPage: Math.ceil(redisData.length/limit),
                        page
                    },
                    // pagination
                    data: redisData.slice(starPage,endPage)
                })
            } else{
                next()
            }
        })
    }
}




module.exports = pos