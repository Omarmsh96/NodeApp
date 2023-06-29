const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const subcategoryModel = require ('../model/subcatModel');


exports.createSubcategory = asyncHandler(async (req, res, next) => {
    const {name, category} = req.body; 
    const subcategory = await subcategoryModel.create({name, slug: slugify(name),category});
    res.status(201).json({data: subcategory})

});