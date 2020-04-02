var express = require('express');
var router = express.Router();
var cities = require('../data/worldcitiespop');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        cities: cities.slice(0, 100)
    });
});

router.post('/', function(req, res, next) {
    let searchedCities = cities;
    if (req.body.country !== "") {
        // виконати пошук за країною
        console.log(req.body.country);

        searchedCities = cities.filter(c => c.Country === req.body.country);

        console.log(searchedCities.length);
    }
    // searchedCities=cities
    if (req.body.city !== "") {
        console.log(req.body.city);

        searchedCities = searchedCities.filter(c => c.City.startsWith(req.body.city));

        console.log(searchedCities.length);
    }
    res.render('index', {
        title: 'Express',
        cities: searchedCities
    });
});

module.exports = router;