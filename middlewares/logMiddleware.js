const fs = require('fs');


const logMiddleware = (req, res, next) => {
    fs.appendFileSync('./data/log.txt', 'Se ingresó en la página: ' + req.url + '\n');

    next();
}

module.exports = logMiddleware;