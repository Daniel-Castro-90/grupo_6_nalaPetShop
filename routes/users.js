let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersController.js');
const { check } = require('express-validator');


//
router.get('/', usersController.login);
router.post('/',usersController.processLogin);


//
router.get ('/register', usersController.register);

router.post('/register',
check('password').isLength({min: 8}).withMessage('La contraseña debe tener como mínimo 8 caracteres.'), 
usersController.create);


//
router.post('/edit', usersController.userSave);
router.post('/save', usersController.userSave);

module.exports = router;