var express = require('express');
var router = express.Router();

var redis = require("redis");
var client = redis.createClient();

router.get('/', function(req, res){

    client.get('allGoods', function(req, obj){
        res.send(obj);
    });

});

router.post('/', function(req, res) {

    var allGoods = req.param.allGoods;
    client.set('allGoods', allGoods, function(err, obj){
        res.send(obj);
    });

});

module.exports = router;
