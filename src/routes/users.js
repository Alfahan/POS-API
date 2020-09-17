const express = require('express')
const usersController = require('../controllers/users')

const router = express.Router()

router
   // Register
   .post('/register',usersController.register)
   // Login
   .post('/login',usersController.login)
   // Refresh 
   .post('/refreshToken',usersController.renewToken)
   //Logout
   .post('/logout',usersController.logout)


   // Get All User
   .get('/getall',usersController.getall)
   // Get Detail User
   .get('/getdetail/:iduser',usersController.getDetail)
   // Update All User
   .put('/update/:iduser',usersController.update)
   // Delete User
   .delete('/delete/:iduser',usersController.delete)

module.exports = router