var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.get('/', function(req, res) {

    client.get('id', function(err, obj){
        var id = obj || JSON.stringify(0);
        res.send(obj);
    });
});

module.exports = router;