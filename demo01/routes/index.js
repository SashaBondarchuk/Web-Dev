var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res) {
//     //res.render('index', { title: 'Express' });
//     res.send('Hello ' + req.query.name);
// });

router.get('/make-short-name', function(req, res) {
    //res.render('index', { title: 'Express' });
    res.send('Hello ' + req.query.firstname[0] + ". " + req.query.lastname);
});

module.exports = router;