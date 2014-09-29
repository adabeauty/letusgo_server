var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require('redis');
var client = redis.createClient();

function deleteItem(Id, callback){

    client.get('cart', function(err, obj){
        var boughtGoods = JSON.parse(obj);
        _.remove(boughtGoods, function(every){
            return every.item.Id === Id;
        });
        callback(boughtGoods);
    });
}

function modifyItem(modifyObject, Id, callback){

    client.get('cart', function(err, obj){
        var boughtGoods = JSON.parse(obj);
        var index = _.findIndex(boughtGoods, function(every){
            return every.item.Id === Id;
        });
        boughtGoods[index] = modifyObject;
        callback(boughtGoods);
    });
}

router.get('/', function(req, res){

    client.get('cart', function(req, obj){

        var cart = obj || JSON.stringify([]);
        res.send(JSON.parse(cart));
    });

});

router.post('/', function(req, res) {

    var boughtGoods = req.param('cart');

    client.set('cart', JSON.stringify(boughtGoods), function(err, obj){
        res.send(obj);
    });

});

router.delete('/:Id', function(req, res){

    var deleteItemId = JSON.parse(req.params.Id);
    deleteItem(deleteItemId, function(boughtGoods){
        client.set('cart', JSON.stringify(boughtGoods), function(err, obj) {
            res.send(obj);
        });
    });

});

router.put('/:Id', function(req, res){

    var modifyItemId = JSON.parse(req.params.Id);
    var modifyObject = req.param('item');

    modifyItem(modifyObject, modifyItemId, function(boughtGoods){
        client.set('cart', JSON.stringify(boughtGoods), function(err, obj){
            res.send(obj);
        });
    });
});

module.exports = router;
