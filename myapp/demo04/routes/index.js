var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'My Demo Prog',
        FirstName: req.query.firstname,
        LastName: req.query.lastname
    });
});

module.exports = router;