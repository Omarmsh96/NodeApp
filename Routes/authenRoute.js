const express = require('express');
const  {signUp,signIn} = require('../services/authenService')
const {signupValidation , signInValidation}= require('../middleware/authenValidator')

const router = express.Router();

router.route('/signup').post(signupValidation,signUp)
router.route('/signin').post(signInValidation,signIn)



module.exports = router;