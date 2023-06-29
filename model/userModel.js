const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
    name:
    {
        type: String,  
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email:
    {
        type: String,  
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:
    {
        type: String, 
        required: true,
        minlength: 8,
        unique: true,
    },
 
});


userSchema.pre('save', async function (next) {
// hash the password that entered before is saved in DB
this.Password  = await bcrypt.hash(this.password, 12)
next();
}
 ) 

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;