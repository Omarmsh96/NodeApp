const mongoose = require (' mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            tim: ture,
            required: [true,'name required' ]
        },
        email: {
            type: String,
            required: [true,'email required' ],
            uniqe: true,
            lowercase:true,
        },
        password: {
            type: String,
            required: [true,'password required' ],
            minlenght:[8 , 'loo short password ' ]
        },
        phone: String,

    
    }, 
       
    {timestamps: ture}) 

    const User = mongoose.model('User ', userSchema );
    module.exports = User;