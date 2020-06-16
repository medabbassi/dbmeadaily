const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../modules/user');
const express = require('express');
const router = express.Router();


router.post('/', async(req, res)=>{

    const{error}= validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let user=await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send('that user is exists!');

    }else{
        user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            });
            user = new User(_.pick(req.body, ['first_name', 'last_name','email', 'password','phone_number']));
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save(),
            res.json(_.pick(user, ['_id', 'first_name','last_name', 'email','phone_number','createdAt']));
            //res.send(user);
    }
});



module.exports=router;