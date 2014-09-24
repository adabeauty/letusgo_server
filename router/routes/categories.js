var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

function addItem(addObject, callback){

    client.get('categories', function(err, obj){
        var categories = JSON.parse(obj);
        console.log(categories);
        categories.push(addObject);
        callback(categories);
    });
}
function deleteItem(ID, callback){

    client.get('categories', function(err, obj){
        var categories = JSON.parse(obj);
        _.remove(categories, {ID: ID});
        callback(categories);
    });
}

function modifyItem(modifyObject, ID, callback){

    client.get('categories', function(err, obj){
        var categories = JSON.parse(obj);
        var index = _.findIndex(categories, {ID: ID});
        categories[index] = modifyObject;
        callback(categories);
    });
}

router.get('/', function(req, res){

    client.get('categories', function(err, obj){
        res.send(JSON.parse(obj));
    });

});

router.post('/', function(req, res) {

    var addObject = req.param('category');

    addItem(addObject, function(categories){
        client.set('categories', JSON.stringify(categories), function(err, obj) {
            res.send(obj);
        });
    });
});

router.delete('/:ID', function(req, res){

    var deleteItemId = JSON.parse(req.params.ID);
    deleteItem(deleteItemId, function(categories){
        client.set('categories', JSON.stringify(categories), function(err, obj) {
            res.send(obj);
        });
    });

});

router.put('/:ID', function(req, res){

    var modifyItemId = JSON.parse(req.params.ID);
    var modifyObject = req.param('category');
    modifyItem(modifyObject, modifyItemId, function(categories){

        client.set('categories', JSON.stringify(categories), function(err, obj){
            res.send(obj);
        });
    });
});

module.exports = router;
