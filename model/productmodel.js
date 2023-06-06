const mongoose = require('mongoose')

// create DatabaseSchema
const productSchema = new mongoose.Schema({
    name: String,
  });
  


  //create model
  const productModel= mongoose.model('Prodcut', productSchema );
  
  module.exports= productModel ;