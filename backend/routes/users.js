const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../helpers/auth');
const config = require('../helpers/config');
const User = require('../models/user');


router.post('/login', function(req, res) {
  email = req.body.email;
  password = req.body.password;
  User.findOne({ email: email}, function (err, data) {
    if(data)
    {
      auth.comparePassword(password,data.password,function(identical){
        if(identical)
        {
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + config.JWT_EXP_TIME,
            userID: data.id }, 
            config.JWT_SECRET);
          res.status(200).send({_token:token});
        }else{
          res.status(403).send('Not Match');
        }
      });
    }else{
      res.status(404).send('Not Found');
    }
  });
});

module.exports = router;
