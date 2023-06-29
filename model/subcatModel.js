const mongoose = require ('mongoose') ; 

const subcategorySchema = new mongoose.Schema(
    {
        name: 
        { 
            type: String,
            trim: true,    // remove space and store in db
            unique:true,
            required: true,
        },
        
       slug: 
        {
            type: String,
            lowercase: true,
        }, 

        category:
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true,
        }

    }, 
{ timestamps: true }
)

const subcatModel= mongoose.model('subcategory', subcategorySchema );
module.exports=subcatModel;