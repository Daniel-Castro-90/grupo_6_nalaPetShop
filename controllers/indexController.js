const path = require('path')

const indexController = {
    main: function (req, res) {
        res.render('index');
    },
};

module.exports = indexController;