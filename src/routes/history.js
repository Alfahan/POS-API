const express = require('express')
const historyController = require('../controllers/history')
const auth = require('../helpers/auth')

const router = express.Router()

router
    .get('/getall',historyController.getAll)
    .get('/getDetail/:idhistory',historyController.getDetail)
    .post('/insert',historyController.insert)
    .put('/update/:idhistory',auth,historyController.update)
    .patch('/updatePatch/:idhistory',auth,historyController.updatePatch)
    .delete('/delete/:idhistory',auth,historyController.delete)

module.exports = router