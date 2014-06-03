var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var configs = require("./setting").configs;
var connection = configs.connectionString;
var mongo = mongojs(connection);

var app = express();
app.use(bodyParser());
app.listen(configs.port);

app.get("/", function(req, res){
  res.sendfile("index.html");
});

app.post("/api/device", function(req, res){
  var body = req.body;
  if(body._id) {
    body._id = new mongojs.ObjectId(body._id);
  }
  var collection = mongo.collection("LiveDevices");
  collection.save(body, function(err, doc){
    res.json(doc);
  });
});

app.get("/api/device/:id", function(req, res){

  var id = req.params.id;

  function findHanlder(err, docs){
    res.json(docs);
  }

  var collection = mongo.collection("LiveDevices");
  collection.find( { serialNumber: id } , findHanlder);

});
