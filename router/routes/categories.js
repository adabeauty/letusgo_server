var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

function getId(categories){

    if(categories.length === 0){
        return 1;
    }else{
        var lastID = categories[categories.length - 1].ID;
        var currentID = lastID + 1;
        return currentID;
    }
}
function addItem(newCategoryName, callback){

    client.get('categories', function(err, obj){
        var ID = getId(JSON.parse(obj));
        var addObject = {
            ID: ID,
            name: newCategoryName,
            num: '0'
        };
        var categories = JSON.parse(obj);
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
        var categories = obj || [];
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
