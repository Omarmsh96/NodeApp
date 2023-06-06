
const mongoose = require('mongoose')

// create DatabaseSchema
const categorySchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true,
     },
     slug: {
        type: String,
        lowercase: true,
     },      
  }, 
  {timestamps: true }
);
  

  //create model
  const categoryModel= mongoose.model('category', categorySchema );
  
  module.exports= categoryModel ;