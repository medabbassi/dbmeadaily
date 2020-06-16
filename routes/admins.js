const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Admin, validate} = require('../modules/admin');
const express = require('express');
const router = express.Router();


router.post('/', async(req, res)=>{

    const{error}= validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let admin=await Admin.findOne({email: req.body.email});
    if(admin){
        return res.status(400).send('that user is exists!');

    }else{
        admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            security_key: req.body.security_key,
            });
            admin = new Admin(_.pick(req.body, ['name', 'email','password', 'security_key']));
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(admin.password, salt);
            const salt2= await bcrypt.genSalt(10);
            admin.security_key = await bcrypt.hash(admin.security_key, salt2);
            await admin.save(),
            res.send(_.pick(admin, ['_id', 'name','email', 'password','createdAt','isAdmin']));
            //res.send(user);
    }
});
module.exports=router;