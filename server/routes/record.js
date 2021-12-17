const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("omsdb");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb("omsdb");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb("omsdb");
  let myobj = {
    person_name: req.body.person_name,
    person_age: req.body.person_age,
    person_joined_orphanage: new Date(req.body.person_joined_orphanage),
    person_grade: req.body.person_grade,
    person_image: req.body.image_url,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("omsdb");
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_age: req.body.person_age,
      person_joined_orphanage: new Date(req.body.person_joined_orphanage),
      person_grade: req.body.person_grade,
      person_image: req.body.image_url,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb("omsdb");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

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
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("items").findOne(myquery, function (err, result) {
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
  let myquery = { _id: ObjectId(req.params.id) };
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
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("items").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

recordRoutes.route("/user/Login").post(function (req, res) {
  let db_connect = dbo.getDb("omsdb");
  const { email, password } = req.body;

  db_connect.collection("users").findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        console.log('success');
        res.send({ message: "login sucess", user: user });
      } else {
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not register");
    }
  });
});

recordRoutes.route("/user/Register").post(function (req, res) {
  let db_connect = dbo.getDb("omsdb");
  console.log(req.body);
  const { name, email, password,role } = req.body;
  db_connect.collection("users").findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {

      db_connect.collection("users").insertOne(
        {
          name: name,
          email: email,
          password: password,
          role:role,
        },
        function (err, response) {
          if (err) throw err;
          res.send({ message: "sucessfull" });
        }
      );
    }
  });
});

module.exports = recordRoutes;
