const express=require('express');
const userrouter=express.Router();
const userController=require('../controller/user.controller');
const {checkForAuthenticationCookie}=require('../middleware/authorize.middleware');

userrouter.use(checkForAuthenticationCookie('token'));
userrouter.post('/register',userController.registerUser);
userrouter.post('/login',userController.loginUser);

module.exports=userrouter;