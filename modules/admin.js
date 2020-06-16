const Joi = require('joi');
const mongoose = require('mongoose');

const Admin = mongoose.model('admin', new mongoose.Schema ({
    name : {
        type : String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email :{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    security_key:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 1024
    },
    createdAt: {
        type : Date,
        default: Date.now
    },
    isAdmin :{
        type:Boolean,
        default: true
    }


}));


function validateAdmin(admin){
   
    const schema= {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password:Joi.string().min(5).max(50).required(),
        security_key: Joi.string().min(5).max(255).required(),
        createdAt: Joi.date(),
        isAdmin: Joi.boolean()
    };
    return Joi.validate(admin, schema);
}
exports.Admin=Admin;
exports.validate= validateAdmin;