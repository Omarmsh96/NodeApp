const {check} = require('express-validator');

const userModel = require('../model/userModel');


exports.signupValidation = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .custom((value) => userModel.findOne({ email: value })
      .then((user) => {
        if (user) {
          return Promise.reject( new Error('Email is already registered'));
        }
      }))
      
    .withMessage('Email is required'),
  
   check('password')
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 8 }).withMessage('Password is invalid')
  .custom((password, { req }) => {
    if (password !== req.body.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

check('confirmPassword')
  .notEmpty().withMessage('Confirm Password is required'),  
];


exports.signInValidation = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .withMessage('Email is required'),
  
   check('password')
  .notEmpty().withMessage('Password is required')
];
