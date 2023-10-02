let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexController.js');


router.get('/', indexController.main);


module.exports = router;