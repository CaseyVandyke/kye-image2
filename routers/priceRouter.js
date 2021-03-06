const Price = require("../models/pricingModel");
const User = require("../models/usersModel");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const router = express.Router();

router.get("/pricing", (req, res, next) => {
  Price.find().then(arr => {
    let index = arr.length - 1;
    res.status(200).json({
      families: arr[index].families,
      extended: arr[index].extended,
      packageA: arr[index].packageA,
      packageB: arr[index].packageB,
      packageC: arr[index].packageC,
      newborn: arr[index].newborn,
      senior: arr[index].senior,
      maternity: arr[index].maternity
    });
  });
});

router.post("/pricing", jsonParser, (req, res, next) => {
  payload = {
    families: req.body.families,
    extended: req.body.extended,
    packageA: req.body.packageA,
    packageB: req.body.packageB,
    packageC: req.body.packageC,
    newborn: req.body.newborn,
    senior: req.body.senior,
    maternity: req.body.maternity,
    id: 12345
  };
  Price.create(payload)
    .then(newPrice => res.status(201).json(newPrice))
    .catch(err => {
      res.status(500).json({
        error: "Unauthorized user"
      });
    });
});

router.put("/pricing", (req, res, next) => {
  const updated = {};
  const updateableFields = [
    "families",
    "extended",
    "packageA",
    "packageB",
    "packageC",
    "newborn",
    "senior",
    "maternity"
  ];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  let id = 12345;
  Price.find({ id: id }).then(price => {
    Price.findByIdAndUpdate(price._id, { $set: updated }, { new: true })
      .then(updatedPrice => {
        res.status(200).json({
          message: "You successfully updated your price."
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "There is an error with updating your price."
        });
      });
  });
});

router.delete("/pricing/:id", (req, res, next) => {
  Price.findByIdAndDelete(req.params.id).then(() => {
    console.log(`Deleted price with id \`${req.params.id}\``);
    return res.status(200).json({
      message: "Your price was successfully deleted",
      post: req.params.id
    });
  });
});

module.exports = {
  router
};
