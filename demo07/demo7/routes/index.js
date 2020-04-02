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
                var dbo = database.db("countries"); //use countries
                //db.myCountries ==>  dbo.collection("myCountries")
                //if (dbo==null) throw err;
                dbo.collection("myCountries").find()
                    .toArray(
                        function(err, result) {
                            if (err) throw err;
                            database.close();
                            res.render('index', {
                                title: 'Countries database',
                                myCountries: result
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
                //console.log(req.body.Сountry);
                var dbo = database.db("countries");
                var query = {
                    Country: new RegExp("^" + req.body.Country)
                        // Population: { $ne: '' }
                };
                //console.log(query);
                dbo.collection("myCountries").find(query).toArray(
                    function(err, result) {
                        if (err) throw err;
                        database.close();
                        res.render('index', {
                            title: 'Express',
                            myCountries: result
                        });
                    });
            });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;