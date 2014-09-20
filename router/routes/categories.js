var express = require('express');
var router = express.Router();

var redis = require("redis");
var client = redis.createClient();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.get('/', jsonParser, function(req, res) {

    //TODO: Need to implement.
    console.log(req.body.category);
    client.get('category', function (err, obj) {
        res.send(obj);
    });

});


router.post('/', jsonParser, function(req, res) {

    var category = req.param('category');
//    console.log(req.body.category);
    client.set('category', category, function (err, obj) {
        console.log(obj);
        res.send(obj);
    });
//    res.send('Success');

});

module.exports = router;

//$http({method: 'GET', url: '/api/categories'}).
//    success(function(data) {
//        console.log(data);
//    });
//
//
//var data = {'name':'hello world !'};
//$http.post("/api/categories", data).success(function(){
//    console.log(data);
//});