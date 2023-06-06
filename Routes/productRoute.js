const express = require('express'); 
const {getProduct} = require('../services/productService')

const router = express.Router();

router.get('/', getProduct);

module.exports = router; 