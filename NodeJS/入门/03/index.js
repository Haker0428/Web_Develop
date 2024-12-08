
const fs = require('fs');
const path = require('path');

console.log(__dirname);

fs.readFile(path.join(__dirname, '../1.txt'), (err, data)=> {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
})
