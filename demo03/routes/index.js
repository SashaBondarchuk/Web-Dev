var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'My Demo Prog'
    });
});

router.post('/', function(req, res) {
    if (isNaN(req.body.firstvalue && req.body.firstvalue) === true) {
        res.render('Not a Number!');
    } else {
        res.render('index', {
            title: 'calculator:',
            Result: 'multiplication = ' + parseInt(parseInt(req.body.firstvalue) * parseInt(req.body.secondvalue)) + ' ' +
                'Sum = ' + parseInt(parseInt(req.body.firstvalue) + parseInt(req.body.secondvalue)) + ' ' +
                'divide = ' + parseInt(parseInt(req.body.firstvalue) / parseInt(req.body.secondvalue))
        });
    }
});

module.exports = router;