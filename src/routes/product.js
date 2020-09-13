const express = require('express')
const productController = require('../controllers/product')
const auth = require('../helpers/auth')

const upload = require('../helpers/upload')

const router = express.Router()

router
.get('/getall',productController.getAll)
.get('/getdetail/:idproduct',productController.getDetail)
.post('/insert', upload.single('img'),productController.insert)
.put('/update/:idproduct',upload.single('img'),productController.update)
.patch('/updatePatch/:idproduct',upload.single('img'),productController.updatePatch)
.delete('/delete/:idproduct', productController.delete)


module.exports = router