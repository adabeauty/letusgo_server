var express = require('express');
var router = express.Router();

var _ = require('lodash');

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

router.delete('/:Id', function(req, res){

    client.get('boughtGoods', function(err, obj){

        var boughtGoods = JSON.parse(obj);
        var deleteItem = JSON.parse(req.params.Id);
        _.remove(boughtGoods, function(every){
            return every.item.Id === deleteItem;
        });

        client.set('boughtGoods', JSON.stringify(boughtGoods), function(err, obj){
            res.send(obj);
        });
    });
});

module.exports = router;
