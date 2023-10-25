const fs = require('fs');


const logNewProducts = (req, res, next) => {
    fs.appendFileSync('./data/logNewproducts.txt', 'Se el nuevo producto: ' + req.url + '\n');

    next();
}

module.exports = logNewProducts;