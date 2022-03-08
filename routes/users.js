const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users')
const passport = require('passport')
const users = require('../controllers/users')

router.get('/register', users.renderRegister)

router.post('/register', users.registerUser)

router.get('/login', users.renderLogin)

router.post('/login',passport.authenticate('local',{ failureFlash: true, failureRedirect: '/login'}) ,users.loginUser)

router.get('/logout', users.logoutUser)



module.exports = router;

// Consider using router.routes