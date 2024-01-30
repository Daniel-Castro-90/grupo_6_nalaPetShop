let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersController.js');
const userValidation = require('../middlewares/usersValidatorMiddleware.js');
const upload = require('../middlewares/multerUsersMiddleware.js');
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware.js');
const cloudinaryMiddleware = require('../middlewares/cloudinaryMiddleware.js');
const redirectIfAuthMiddleware = require('../middlewares/redirectIfAuthMiddleware.js');

//Login
//cambiar header para cuando esta logeado.
router.get('/', redirectIfAuthMiddleware, usersController.login);
router.post('/login', usersController.processLogin);
router.get('/profile', isLoggedMiddleware, usersController.profile);
router.get('/logout', usersController.logout);


//Register
router.get ('/register', redirectIfAuthMiddleware, usersController.register);
router.post('/register', upload.single('image'), userValidation, cloudinaryMiddleware,  usersController.create);


//Modification
router.get('/:idUser/profile', isLoggedMiddleware, usersController.editor);
router.put('/:idUser/profile', upload.single('image'), usersController.update);


router.get('/topSecret', usersController.topSecret);

module.exports = router;