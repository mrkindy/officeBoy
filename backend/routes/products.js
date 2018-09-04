const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Products = require('../models/products');

router.post('/', (req, res) => {
  const product = new Products({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    image:req.body.image,
    price:req.body.price
  });

  product
        .save()
        .then(result=>{
          res.status(201).json({
            message: "Product success added",
            createdProduct: result
          });
        })
        .catch(err=>{
          res.status(500).json({
            message: err,
          });
        });
});



router.get("/:productId", (req, res) => {
  const id = req.params.productId;
  Products.findById(id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "Product Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});
//[{"propName":"price","value":7.4}]
router.patch("/:productId", (req, res) => {
  const id = req.params.productId;
  const updateObject = {};
  for (const item of req.body) {
    updateObject[item.propName] = item.value;
  }
  Products.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

router.delete("/:productId", (req, res) => {
  const id = req.params.productId;
  Products.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});


module.exports = router;
