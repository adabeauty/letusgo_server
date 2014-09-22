var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

router.get('/', function(req, res){

    client.get('goods', function(req, obj){
        res.send(JSON.parse(obj));
    });

});

router.post('/', function(req, res) {

    var boughtGoods = req.param('goods');

    client.set('goods', JSON.stringify(boughtGoods), function(err, obj){
        res.send(obj);
    });

});

router.delete('/:Id', function(req, res){

    client.get('goods', function(err, obj){

        var goods = JSON.parse(obj);
        var deleteItem = JSON.parse(req.params.Id);
        _.remove(goods, function(every){
            return every.Id === deleteItem;
        });

        client.set('goods', JSON.stringify(goods), function(err, obj){
            res.send(obj);
        });
    });
});
module.exports = router;
