var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'My Demo Prog'
    });
});

router.post('/', function(req, res) {
    res.render('index', {
        title: 'Method POST result:',
        Greeting: 'Hello, ' + req.body.firstname[0] + '. ' + req.body.lastname
    });
});

module.exports = router;