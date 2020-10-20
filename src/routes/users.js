const express = require('express')
const usersController = require('../controllers/users')
const auth = require('../helpers/auth')
const router = express.Router()

router
   // Register
   .post('/register',usersController.register)
   
   // Login
   .post('/login',usersController.login)
   
   // Refresh 
   .post('/refreshToken', usersController.renewToken)
   
   //Logout
   .post('/logout/:iduser',usersController.logout)

   // Verify
   .get('/verify/:token',usersController.verify)


   // Get All User
   .get('/getall',auth.authentication, auth.authorization, usersController.getall)
   
   // Get Detail User
   .get('/getdetail/:iduser',auth.authentication, auth.authorization,usersController.getDetail)
   
   // Update All User
   .put('/update/:iduser',auth.authentication, auth.authorization,usersController.update)
   
   // Delete User
   .delete('/delete/:iduser',auth.authentication, auth.authorization, usersController.delete)

module.exports = router