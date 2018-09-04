const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const auth = module.exports = {};
const saltRounds = 10;
auth.user = {};
auth.getHash = function(password,callback)
{
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          callback(hash);
        });
      });
}
auth.comparePassword = function(password,hash,callback)
{
  bcrypt.compare(password, hash, function(err, res) {
    callback(res);
  });
}

// Verify Token
auth.verifyToken = function(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, config.JWT_SECRET,function (err, data) {
      if(err)
      {
        res.status(403).send(err);
      }else{
        const now = Math.floor(Date.now() / 1000);
        if(data.exp<now)
        {
          res.status(201).send({"message":"Token Expired","expired":data.exp,"now":now});
        }else{
          auth.user = data;
          next();
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}