var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017";

/* GET home page. */

// основна сторінка
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(
            url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("books");
                dbo.collection("my_books").find()
                    .toArray(function(err, result) {
                        if (err) throw err;
                        database.close();
                        res.render('index', {
                            title: 'Books database',
                            my_books: result
                        });
                    });
            });
    } catch (err) {
        console.error(err);
        res.render('error', {
            title: 'Error'
        });
    }
});

//edit ---------------------
router.get('/edit/:id', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("books");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('my_books').findOne(query, function(err, result) {
                    //console.log(result);
                    if (err) throw err;
                    database.close();
                    res.render('edit.hbs', {
                        title: "Edit",
                        book: result
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
                var dbo = database.db("books");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('my_books').findOneAndUpdate(
                    query, {
                        $set: {
                            Book: req.body.Book,
                            Publication: req.body.Publication,
                            Year: req.body.Year,
                            Author: req.body.Author,
                            NumberOfPages: req.body.NumberOfPages
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
                var dbo = database.db("books");
                var query = {
                    '_id': ObjectId(req.params.id)
                };
                dbo.collection('my_books').deleteOne(query, function(err, result) {
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
        title: "Create",
        book: null
    });
});

router.post('/create', function(req, res, next) {
    try {
        MongoClient.connect(url, { useUnifiedTopology: true },
            function(err, database) {
                if (err) throw err;
                var dbo = database.db("books");

                dbo.collection('my_books').insertOne({
                    Book: req.body.Book,
                    Publication: req.body.Publication,
                    Year: req.body.Year,
                    Author: req.body.Author,
                    NumberOfPages: req.body.NumberOfPages
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