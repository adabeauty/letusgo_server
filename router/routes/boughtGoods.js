var express = require('express');
var router = express.Router();

var redis = require("redis");
var client = redis.createClient();

router.get('/', function(req, res){

    client.get('boughtGoods', function(req, obj){
        res.send(JSON.parse(obj));
    });

});

router.post('/', function(req, res) {

    var boughtGoods = req.param('boughtGoods');

    client.set('boughtGoods', JSON.stringify(boughtGoods), function(err, obj){
        res.send(obj);
    });

});

module.exports = router;
