const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
fs.createReadStream('./data/worldcitiespop.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results);    
    console.log('Convert CSV to JSON');
    let json = JSON.stringify(results);    
    fs.writeFile('./data/worldcitiespop.json', json, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
  });