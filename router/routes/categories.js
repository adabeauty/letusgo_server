var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

function modifyItem(modifyObject, ID, callback){

    client.get('categories', function(err, obj){
        var categories = JSON.parse(obj);
        var index = _.findIndex(categories, {ID: ID});
        categories[index] = modifyObject;
console.log(categories);
        callback(categories);
//        return categories;
    });
}

router.get('/', function(req, res){

    client.get('categories', function(err, obj){
        res.send(JSON.parse(obj));
    });

});
router.post('/', function(req, res) {

    var categories = req.param('categories');

    client.set('categories', JSON.stringify(categories), function (err, obj) {
        res.send(obj);
    });

});

router.delete('/:Id', function(req, res){

    client.get('categories', function(err, obj){

        var categories = JSON.parse(obj);
        var deleteCategory = req.params.Id;
        _.remove(categories, function(every){
            return every.Id === deleteCategory;
        });

        client.set('categories', JSON.stringify(categories), function(err, obj){
            res.send(obj);
        });
    });
});

router.put('/:ID', function(req, res){

    var deleteItemId = JSON.parse(req.params.ID);
    var modifyObject = req.param('category');
    modifyItem(modifyObject, deleteItemId, function(categories){

        console.log('categories', categories);
        client.set('categories', JSON.stringify(categories), function(err, obj){
            res.send(obj);
        });
    });
});

module.exports = router;
