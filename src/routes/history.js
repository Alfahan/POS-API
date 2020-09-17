const express = require('express')
const historyController = require('../controllers/history')
const auth = require('../helpers/auth')

const router = express.Router()

router
    .post('/insert',auth.authentication, auth.authorization,historyController.insert)


module.exports = router