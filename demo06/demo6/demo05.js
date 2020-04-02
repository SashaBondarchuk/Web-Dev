const csv = require('csv-parser')
const fs = require('fs')
let results = [];

fs.createReadStream('./data/worldcitiespop.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results = results.map(e => {
            return {
                Country: e.Country,
                City: e.City,
                AccentCity: e.AccentCity,
                Region: e.Region,
                Population: (e.Population !== '') ? parseFloat(e.Population) : null,
                Latitude: parseFloat(e.Latitude),
                Longitude: parseFloat(e.Longitude)
            }
        });
        console.log(results.slice(0, 10));
        console.log('Convert CSV to JSON');
        let json = JSON.stringify(results);
        fs.writeFile('./data/worldcitiespop.json', json, 'utf8', function(err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    });