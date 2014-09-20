var express = require('express');
var router = express.Router();

var redis = require("redis");
var client = redis.createClient();

router.get('/', function(req, res){

    client.get('clickCount', function(req, obj){
        res.send(obj);
    });

});

router.post('/', function(req, res) {

    var clickCount = req.param('clickCount');

    client.set('clickCount', clickCount, function(err, obj){
        res.send(obj);
    });

});

module.exports = router;
