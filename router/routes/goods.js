var express = require('express');
var router = express.Router();

var redis = require("redis");
var client = redis.createClient();

router.get('/', function(req, res){

    client.get('goods', function(req, obj){
        res.send(obj);
    });

});

router.post('/', function(req, res) {

    var goods = req.param('goods');
    client.set('goods', goods, function(err, obj){
        res.send(obj);
    });

});

module.exports = router;
