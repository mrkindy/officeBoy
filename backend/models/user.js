var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullName:String,
    email:{type : String , indexs : {unique : true,dropDups : true}},
    password:String,
});

module.exports = mongoose.model('User',usersSchema);