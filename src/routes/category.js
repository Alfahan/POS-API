const express = require('express')
const categoryController = require('../controllers/category')
const auth = require('../helpers/auth')

const router = express.Router()

router
    .get('/getall',categoryController.getAll)
    .get('/getDetail/:idcategory',categoryController.getDetail)
    .post('/insert',auth,categoryController.insert)
    .put('/update/:idcategory',auth,categoryController.update)
    .patch('/updatePatch/:idcategory',auth,categoryController.updatePatch)
    .delete('/delete/:idcategory',auth,categoryController.delete)

module.exports = router