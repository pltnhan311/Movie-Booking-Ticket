const express = require('express');
const router = express.Router()

const AuthController = require('../controllers/AuthController')
const authValidator = require('./validator/authValidator')

const AuthRoute = (app) => {

  router.get("/login", AuthController.getLoginPage);
  router.get("/register", AuthController.getRegisterPage);
  router.get("/logout", AuthController.getLogoutPage);
  router.post('/register', authValidator.registerValidator ,AuthController.register)
  router.post('/login', authValidator.loginValidator ,AuthController.login)

  router.get('/userprofile', AuthController.getUpdateProfile)
  router.post('/userprofile', authValidator.updateValidator, AuthController.updateProfile)

  router.get('/userprofile/changePassword', AuthController.getChangePasswordPage)
  router.post('/userprofile/changePassword', authValidator.changePasswordValidator, AuthController.changePassword)

  return app.use("/", router); // tien to route, vidu /abc thi -> /abc/about
}

module.exports = AuthRoute;
