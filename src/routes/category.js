const express = require('express')
const categoryController = require('../controllers/category')
const auth = require('../helpers/auth')

const redis = require('../helpers/redis')

const router = express.Router()

router
    .get('/getall', redis.getCategory, categoryController.getAll)
    .get('/getDetail/:idcategory',categoryController.getDetail)
    .post('/insert', auth.authentication, auth.authorization, categoryController.insert)
    .put('/update/:idcategory',auth.authentication, auth.authorization,  categoryController.update)
    .patch('/updatePatch/:idcategory',auth.authentication, auth.authorization, categoryController.updatePatch)
    .delete('/delete/:idcategory',auth.authentication, auth.authorization,  categoryController.delete)

module.exports = router