const slugify = require('slugify');
const {check,body } = require('express-validator ');

exports.createUserValidator= [
    check('name')
      
]