const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const BodyParser = require("body-parser");
const { Admin } = require('../modules/admin');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
        return res.status(400).send('Incorrect email or password.');
    }


    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const validSecurity = await bcrypt.compare(req.body.security_key, admin.security_key);
    if(!validSecurity){
        return res.status(400).send('Incorrect security_code');
    }

    //temp = Collection.find({email:req.body.email}).fetch()[0].variable;
    res.json(_.pick(admin,['name','email']));
});


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        security_key :Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;