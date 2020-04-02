var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";


/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(
            url, { useUnifiedTopology: true },
            //--------------------------------------------
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("geodatabase"); //use geodatabase
                //db.cities ==>  dbo.collection("cities")
                //if (dbo==null) throw err;
                dbo.collection("cities").find().limit(100)
                    .toArray(
                        function(err, result) {
                            if (err) throw err;
                            database.close();
                            res.render('index', {
                                title: 'Express',
                                cities: result
                            });

                        });
            }); //connect
        //------------------------------------------------
    } catch (err) {
        console.error(err);
        res.render('error', {
            title: 'Error'
        });
    }
}); // get -------------------------

router.post('/', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                console.log(req.body.city);
                var dbo = database.db("geodatabase");
                var query = {
                    Country: req.body.country,
                    //City: new RegExp("^" + req.body.city),
                    Population: { $ne: '' }
                };
                console.log(query);
                dbo.collection("cities").find(query).toArray(
                    function(err, result) {
                        if (err) throw err;
                        database.close();
                        res.render('index', {
                            title: 'Express',
                            cities: result
                        });
                    });
            });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;