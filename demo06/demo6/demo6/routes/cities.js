var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017";

/* GET users listing. */
router.get('/edit/:id', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("geodatabase");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('cities').findOne(query,
                    function(err, result) {
                        //console.log(result);
                        if (err) throw err;
                        database.close();
                        res.render('edit.hbs', {
                            city: result
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
                var dbo = database.db("geodatabase");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('cities').findOneAndUpdate(
                    query, {
                        $set: {
                            Country: req.body.country,
                            City: req.body.city.toLowerCase(),
                            AccentCity: req.body.city,
                            Region: req.body.region,
                            Population: parseFloat(req.body.population) | 0,
                            Latitude: parseFloat(req.body.latitude) | 0,
                            Longitude: parseFloat(req.body.longitude) | 0
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

module.exports = router;