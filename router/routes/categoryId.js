var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.get('/', function(req, res) {

    client.get('categoryId', function(err, obj){
        var id = obj || JSON.stringify(0);
        res.send(JSON.parse(id));
    });
});

router.post('/', function(req, res) {

    var currentId = req.param('currentId');
    client.set('categoryId', JSON.stringify(currentId), function(err, obj){
        res.send(obj);
    });
});

module.exports = router;