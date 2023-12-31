
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const categoryModel = require('../model/categorymodel')
const ErrorApi = require("../middleware/ErrorApi") 



// get the list of categortes  // GET API // access pucblic (user )
exports.getCategories= asyncHandler(async(req ,res ) => {
    //Pagination variables are defined to determine the current page,
    const page= req.query.page *1 || 1;  
    const limit = 5;
    const skip = ( page - 1 ) * limit  // (2 -1 ) * 5 = 5 that mean skip first 5 document and get the next 5 doc 

    const categories = await categoryModel.find({}).skip(skip).limit(limit)   // return a list of cat
    
    res.status(201).json({ data: categories ,page , results: categories.length});

})

// get specific category by Id comming from request  
// route api/v1/category/id  GET by Id
exports.getCategory = asyncHandler(async(req ,res,next) => {
    const { id } = req.params ;
    const category = await categoryModel.findById(id);  // get  category from database 
    if(!category) {

       return next( new ErrorApi(`no category for this id ${id}`, 404 ), )
        //res.status(404).json({message: `no category for this id ${id}`})
    }
    res.status(200).json({data: category})
});

// update category // PUT API
// access private 

exports.updateCategory = asyncHandler(async (req, res,next ) => {
    const {id} = req.params ; 
    const name = req.body ;   // update name comming from body  
 
    const category = await categoryModel.findOneAndUpdate(
     { _id: id },
     { name },   // {name:name} name from database = name from request
     { new: true },    // to  retrun category after updating 
     );

     if(!category) {
        
        return next(new ErrorApi(`no category for this id ${id}`, 404))

        //res.status(404).json({message: `no category for this id ${id}`})
     }
     res.status(200).json({data: category})
 });

 // Delete specfic category by ID DELETE API 
 // access private 

 exports.deleteCategory = asyncHandler(async (req,res,next) => {
    const {id} = req.params; 
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
        return next(new ErrorApi(`no category for this id ${id}`,404))
        //res.status(404).json({message: `no category for this id ${id}`})

    }
    res.status(204).send();
 })

//create Category // POST APi  // acess private (admin )

exports.createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body ;
    const Category = await categoryModel.create({ name , slug: slugify(name) });      
    res.status(201).json({ data: Category });
  });
  


  
/*
exports.createCategory = (req, res) => {
    const name = req.body.name;
  
    categoryModel.create({ name })
      .then((category) => res.status(201).json({ data: category }))
      .catch(err => res.status(400).send(err));
  };
*/
