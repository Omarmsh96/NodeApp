const express = require('express'); 
const {check} = require('express-validator');
const validator = require('../middleware/validator')
const {getCategory, getCategories,updateCategory,deleteCategory, createCategory} = require('../services/categoryService')

const router = express.Router();



router.route('/')
      .get(  getCategories)
      .post(check("name").notEmpty().withMessage('name required'),  createCategory);


      router.route('/:id')
      .get(check('id').isMongoId().withMessage('in valid category id'),getCategory)
      .put(check('id').isMongoId().withMessage('in valid category id'),updateCategory)
      .delete(deleteCategory);

module.exports = router; 