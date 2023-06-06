const express = require('express'); 
const {check} = require('express-validator');
const validator = require('../middleware/validator')
const {getCategory, getCategories,updateCategory,deleteCategory, createCategory} = require('../services/categoryService')

const router = express.Router();



router.route('/')
      .get( check("name").notEmpty.withMessage('name required'), validator, getCategories)
      .post(createCategory);


      router.route('/:id')
       //validtion // check before going to getCategory 
      .get(
        check('id').isMongoId().withMessage('in valid category id'),validator,getCategory)
      .put(check('id').isMongoId().withMessage('in valid category id'),validator,updateCategory)
      .delete(deleteCategory);

module.exports = router; 