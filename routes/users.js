let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersController.js');


router.get ('/', usersController.login);
router.post('/', usersController.login);


router.get ('/register', usersController.register);
router.post('/register', usersController.create);

router.post('/edit', usersController.userSave);

router.post('/save', usersController.userSave);

module.exports = router;