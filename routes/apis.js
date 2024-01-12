let express = require('express');
const apisController = require('../controllers/apisController');
let router = express.Router();


// Api para usuarios
router.get('/users', apisController.getAllUsers );
router.get('/users/:id', apisController.getUser );

// Api para productos

 
module.exports = router;