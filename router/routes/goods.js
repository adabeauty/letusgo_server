var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

function deleteItem(Id, callback){

    client.get('boughtGoods', function(err, obj){
        var boughtGoods = JSON.parse(obj);
        _.remove(boughtGoods, {Id: Id});
        callback(boughtGoods);
    });
}
router.get('/', function(req, res){

    client.get('goods', function(req, obj){
        res.send(JSON.parse(obj));
    });

});

router.post('/', function(req, res) {

    var goods = req.param('goods');

    client.set('goods', JSON.stringify(goods), function(err, obj){
        res.send(obj);
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
module.exports = router;
