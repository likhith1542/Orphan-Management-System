const express = require("express");

const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/item").get(function (req, res) {
  let db_connect = dbo.getDb("omsdb");
  db_connect
    .collection("items")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/item/:id").get(function (req, res) {
  let db_connect = dbo.getDb("omsdb");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("items")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

recordRoutes.route("/item/add").post(function (req, response) {
  let db_connect = dbo.getDb("omsdb");
  let myobj = {
    item_name: req.body.item_name,
    item_quantity: req.body.item_quantity,
  };
  db_connect.collection("items").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

recordRoutes.route("/item/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("omsdb");
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        item_name: req.body.item_name,
        item_quantity: req.body.item_quantity,
    },
  };
  db_connect
    .collection("items")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

recordRoutes.route("/item/:id").delete((req, response) => {
  let db_connect = dbo.getDb("omsdb");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("items").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;