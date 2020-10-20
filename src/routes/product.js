const express = require('express')
const productController = require('../controllers/product')

const auth = require('../helpers/auth')

const redis = require('../helpers/redis')

const router = express.Router()

router
.get('/getall', redis.getProduct , productController.getAll)
.get('/getdetail/:idproduct', productController.getDetail)
.post('/insert',auth.authentication,auth.authorization, productController.insert)
.put('/update/:idproduct',auth.authentication,auth.authorization, productController.update)
.patch('/updatePatch/:idproduct',auth.authentication,auth.authorization, productController.updatePatch)
.delete('/delete/:idproduct',auth.authentication,auth.authorization,  productController.delete)


module.exports = router