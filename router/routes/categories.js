var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

function getId(callback){

    client.get('categoryId', function(req, obj){
        var lastId = obj || JSON.stringify(0);
        var currentId = JSON.parse(lastId) + 1;
        client.set('categoryId', currentId);
        callback(currentId);
    });

}
function addItem(newCategoryName, callback){

    client.get('categories', function(err, obj){

        getId(function(ID){
            var addObject = {
                ID: ID,
                name: newCategoryName,
                num: 0
            };
            var categories = JSON.parse(obj) || [];
            categories.push(addObject);
            callback(categories);
        });

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
        var categories = obj || JSON.stringify([]);
        res.send(JSON.parse(categories));
    });

});

router.post('/', function(req, res) {

    var newCategoryName = req.param('newCategory');
    addItem(newCategoryName, function(categories){
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
