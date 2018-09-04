const express = require('express');
const mongoose = require('mongoose');

const auth = require('../helpers/auth');
const Order = require('../models/order');

const router = express.Router();

router.post('/newOrder', (req, res) => {
    //res.status(200).json({date:new Date});
    const order = new Order({
        _id:new mongoose.Types.ObjectId,
        user:auth.user.userID,
        product:req.body.productID,
        quantity:req.body.quantity?req.body.quantity:1,
        status:0,
        created_at:new Date,
        updated_at:new Date,

      });

    order
    .save()
    .then(result=>{
        res.status(201).json({
        message: "Order success added",
        createdOrder: result
        });
    })
    .catch(err=>{
        res.status(500).json({
        message: err,
        });
    });
});
router.get('/getPendingOrder', function(req, res) {
    Order.find({status:0})
    .populate({path:'product',select: 'name'})
    .populate({path:'user',select: 'fullName'})
    .exec(function(err, orders){
        res.send(orders);  
   });
  });
module.exports = router;