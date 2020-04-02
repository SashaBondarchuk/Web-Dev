var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017";

/* GET users listing. */

//edit ---------------------
router.get('/edit/:id', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("countries");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('myCountries').findOne(query, function(err, result) {
                    //console.log(result);
                    if (err) throw err;
                    database.close();
                    res.render('edit.hbs', {
                        country: result
                    });
                });
            });
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.post('/edit/:id', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("countries");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('myCountries').findOneAndUpdate(
                    query, {
                        $set: {
                            Country: req.body.Country,
                            Population: req.body.Population,
                            area: req.body.area,
                            Capital: req.body.Capital
                        }
                    },
                    function(err, result) {
                        //console.log(result);
                        if (err) throw err;
                        database.close();
                        res.redirect('/');
                    });
            });
    } catch (err) {
        console.log(err);
        throw err;
    }
});
//delete ---------------------
router.get('/delete/:id', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("countries");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('myCountries').deleteOne(query, function(err, result) {
                    //console.log(result);
                    if (err) throw err;
                    database.close();
                    res.redirect('/');
                });
            });
    } catch (err) {
        console.log(err);
        throw err;
    }
});
//create ---------------------
router.get('/create', function(req, res, next) {
    res.render('edit.hbs', {
        country: null
    });
});

router.post('/create', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("countries");

                dbo.collection('myCountries').insertOne({
                    Country: req.body.Country,
                    Population: req.body.Population,
                    area: req.body.area,
                    Capital: req.body.Capital
                }, function(err, result) {
                    //console.log(result);
                    if (err) throw err;
                    database.close();
                    res.redirect('/');
                });
            });
    } catch (err) {
        console.log(err);
        throw err;
    }
});

module.exports = router;