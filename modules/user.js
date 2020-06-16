const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('user', new mongoose.Schema ({
    first_name : {
        type : String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    last_name :{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 1024
    },
    phone_number:{
        type: String,
        required: true,
        minlength:5,
        maxlength:50,
    },
    createdAt: {
        type : Date,
        default: Date.now
    }


}));


function validateUser(user){
   
    const schema= {
        first_name: Joi.string().min(5).max(50).required(),
        last_name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
        phone_number: Joi.string().min(8).max(50).required(),
        createdAt: Joi.date(),
    };
    return Joi.validate(user, schema);
}
exports.User=User;
exports.validate= validateUser;