/*const express = require('express')
const {check} = require('express-validator');
const {createSubcategory} = require('../services/subcatService'); 
const validator = require('../middleware/validator')


const router= express.Router()

router.route('/').post(check("name").notEmpty().withMessage('name required'),
check('category').isMongoId().notEmpty().withMessage('id is invlid')
, validator, createSubcategory)

module.exports= router;
*/