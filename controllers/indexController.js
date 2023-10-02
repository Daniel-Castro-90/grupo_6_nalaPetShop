const path = require('path')

const indexController = {
    main: function (req, res) {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    },
};

module.exports = indexController;