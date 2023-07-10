const {check} = require('express-validator');
//const validator = require('./validator')
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const ErorrApi = require('./ErrorApi')

exports.userValidation = [
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
      throw new ErorrApi('Passwords do not match');
    }
    return true;
  }),

check('confirmPassword')
  .notEmpty().withMessage('Confirm Password is required'),  
];

exports.changePasswordValidation = [
  check('currentPassword').notEmpty().withMessage('Current Password is required'),
  check('confirmPassword').notEmpty().withMessage('Confirm Password is required'),
  
  check('password').notEmpty().withMessage('Confirm Password is required')
    .custom(async (password, { req }) => {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new ErrorApi('User not found');
      }
      const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isCorrectPassword) {
        throw new Error('Current password is incorrect');
      }
      if (password !== req.body.confirmPassword) {
        throw new ErrorApi('Passwords do not match');
      }
      return true;
    }),
];

/*

.custom(async (email) => {
        // Check if the email already exists in the database
        const user = await userModel.findOne({ email });
        if (user) {
          throw new Error('Email is already in use');
        }
        return true;
      })
*/      
