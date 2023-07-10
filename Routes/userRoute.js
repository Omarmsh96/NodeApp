const express = require('express')
const {check} = require('express-validator');
const userModel = require('../model/userModel');
//const userValidator = require('../middleware/userValidator')
const {changePasswordValidation,changePassword, updateUser, deleteUser, getUser} = require('../services/userService');

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const user = await userModel.create({ email, password, name });
      res.status(201).json({ data: user });
    } catch (error) {
      // Handle any errors that occurred during the creation of the user
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//router.put('/changepassword/:id', changePasswordValidation ,changePassword)

router.route('/:id')
  .get(check('id').isMongoId().withMessage('This ID does not exist'), getUser)
  .put(updateUser)
  .delete(check('id').isMongoId().withMessage('This ID does not exist ') ,deleteUser);

module.exports = router;


