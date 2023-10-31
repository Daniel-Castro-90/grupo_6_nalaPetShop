let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersController.js');
const userValidation = require('../middlewares/usersValidatorMiddleware.js')
const upload = require('../middlewares/multerUsersMiddleware.js')
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware.js')

//Login
//agregar que si esta logeado al hacer clic en ingresar lo lleve al perfil, usando lógica middleware isLogged
router.get('/', usersController.login);
router.post('/login', usersController.processLogin);
router.get('/profile', isLoggedMiddleware, usersController.profile);
router.get('/logout', usersController.logout);


//Register
router.get ('/register', usersController.register);
router.post('/register', upload.single('image'), userValidation,  usersController.create);


//Modification
router.post('/edit', usersController.userSave);
router.get('/:idUser/profile', usersController.editor);
router.put('/:idUser/profile', upload.single('image'), usersController.update);


module.exports = router;