var express = require('express');
var router = express.Router();

var _ = require('lodash');

var redis = require("redis");
var client = redis.createClient();

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

router.put('/:Id', function(req, res){

    client.get('categories', function(err, obj){

        var categories = JSON.parse(obj);
        var modifyCategory = JSON.parse(req.params.Id);
        var index = _.findIndex(categories, {'Id': modifyCategory});
        categories[index] = req.param('categories');
        client.set('categories', JSON.stringify(categories), function(err, obj){
            res.send(obj);
        });
    });
});

module.exports = router;
