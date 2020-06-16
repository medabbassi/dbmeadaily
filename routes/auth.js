const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const BodyParser = require("body-parser");
const { User } = require('../modules/user');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    //temp = Collection.find({email:req.body.email}).fetch()[0].variable;
    res.json(_.pick(user,['_id','first_name','last_name','email','phone_number']));
});


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;