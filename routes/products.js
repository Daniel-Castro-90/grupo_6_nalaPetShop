let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController.js');
const upload = require('../middlewares/multerMiddleware.js');
//const logNewProducts = require('../middlewares/logNewProductsMiddleware.js');
const productValidation = require('../middlewares/productsValidatorMiddleware.js');
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware.js');
const cloudinaryMiddleware = require('../middlewares/cloudinaryMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');
const isLoggedButtons = require('../middlewares/isLoggedButtons.js');

//Ver los productos
router.get('/', isLoggedButtons, productsController.products);
router.get('/productsCat', isLoggedButtons, productsController.productsCat);
router.get('/productsDog', isLoggedButtons, productsController.productsDog);

router.get('/productDetail/:idProduct', productsController.detail);

//Editor de productos
router.get('/:idProduct/productEditor', isLoggedButtons, adminMiddleware, productsController.editor);
router.put('/:idProduct/productEditor', upload.single('image'), productsController.update);
router.delete('/:idProduct/productEditor', productsController.destroy); 

//Crear los productos
router.get('/productCreation', productsController.productCreation);
router.post('/', upload.single('image'), cloudinaryMiddleware, productValidation, productsController.create);

//Carrito de compras
router.get('/productCart', productsController.productCart);
router.get("/order/:idProduct", isLoggedMiddleware, productsController.order);

//Búsqueda
router.get('/search', productsController.search);





module.exports = router;