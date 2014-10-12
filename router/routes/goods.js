var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

function addItem(addObject, callback){

    client.get('goods', function(err, obj){
        var goods = JSON.parse(obj);
        goods.push(addObject);
        callback(goods);
    });
}

function deleteItem(Id, callback){

    client.get('goods', function(err, obj){
        var goods = JSON.parse(obj);
        _.remove(goods, {Id: Id});
        callback(goods);
    });
}

function modifyItem(modifyObject, Id, callback){

    client.get('goods', function(err, obj){
        var goods = JSON.parse(obj);
        var index = _.findIndex(goods, {Id: Id});
        goods[index] = modifyObject;
        callback(goods);
    });
}

router.get('/', function(req, res){

    client.get('goods', function(req, obj){
        var goods = obj || JSON.stringify([]);
        res.send(JSON.parse(goods));
    });

});

router.post('/:Id', function(req, res) {

    var addObject = req.param('newGood');

    addItem(addObject, function(goods){
        client.set('goods', JSON.stringify(goods), function(err, obj) {
            res.send(obj);
        });
    });
});

router.delete('/:Id', function(req, res){

    var deleteItemId = JSON.parse(req.params.Id);
    deleteItem(deleteItemId, function(goods){
        client.set('goods', JSON.stringify(goods), function(err, obj) {
            res.send(obj);
        });
    });
});

router.put('/:Id', function(req, res){

    var modifyItemId = JSON.parse(req.params.Id);
    var modifyObject = req.param('good');

    modifyItem(modifyObject, modifyItemId, function(goods){
        client.set('goods', JSON.stringify(goods), function(err, obj){
            res.send(obj);
        });
    });
});

module.exports = router;
