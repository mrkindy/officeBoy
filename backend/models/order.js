const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: [true, 'User ID Required?']},
    product:{type: mongoose.Schema.Types.ObjectId, ref: 'Products' ,required: [true, 'Product ID Required?']},
    quantity:{type:Number,required: [true, 'Number Required?']},
    status:Number,
    created_at:Date,
    updated_at:Date,
});

module.exports = mongoose.model('Order',ordersSchema);