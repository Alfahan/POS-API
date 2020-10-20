const express = require('express')
const historyController = require('../controllers/history')
const auth = require('../helpers/auth')

const router = express.Router()

router
    .post('/insert',auth.authentication, auth.authorization,historyController.insert)
    .get('/getall', auth.authentication, auth.authorization,  historyController. getall)
    .get('/getDetail', auth.authentication, auth.authorization,  historyController. getDetail)


module.exports = router