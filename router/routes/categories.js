var express = require('express');
var router = express.Router();

var redis = require("redis");
var client = redis.createClient();

router.get('/', function(req, res) {

    client.get('categories', function (err, obj) {
         res.send(JSON.parse(obj));
    });

});


router.post('/', function(req, res) {

    var categories = req.param('categories');

    client.set('categories', JSON.stringify(categories), function (err, obj) {
        res.send(obj);
    });

});

module.exports = router;
