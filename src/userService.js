const User = require ('.userModel/');
const { factory } = require('handelfactory');

// get list of users  // GET api 
//acess private 
exports.getUsers = factory.getAll(User);

//get specific user by id .. GET api
//acess private 
exports.getUser = factory.getOne(User);

// create new user  POST api 
//acess private 
exports.createUser = factory.createOne(User);

// update specific user  PUT api
exports.updateUser = factory.updateOne(User);


// delete specific user 
exports.deleteUser= factory.deleteOne(User);

