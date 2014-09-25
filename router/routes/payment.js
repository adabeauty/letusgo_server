var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.post('/', function(req, res) {

    var emptyData = req.param('emptyData');
    client.set('boughtGoods', JSON.stringify(emptyData), function(err, obj){
        res.send(obj);
    });

});

module.exports = router;