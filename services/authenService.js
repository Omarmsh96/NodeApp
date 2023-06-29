const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs')


exports.signUp = asyncHandler(async(req ,res , next ) =>
 {
     // create user 
    const user = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

   // create token sign (1 object -payload{data})
   const token = jwt.sign({id: user._id}, process.env.JWT_Screte, {
    expiresIn: '30d'
   })
   res.status(201).json({data: user, token})
})

//check if email and pass is in the body req (validation)
//check if user exist in db and pass is correct 
// generate token 


exports.signIn= asyncHandler(async(req ,res , next ) =>{
    const user = await userModel.findOne({email:req.body.email  })
    // pass in DB (user) is encrypted but the incomming pass in thebody isnot so we need to compare
    if(!user|| (await bcrypt.compare(req.body.password, user.password)) )
    { return next(new Error('incorrect password or Email')) }

    const token = jwt.sign({id: user._id},process.env.JWT_Screte,{
        expiresIn0: '30d'
    })
    res.status(200).json({data: user ,token })
})
   
