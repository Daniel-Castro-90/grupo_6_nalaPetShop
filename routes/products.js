let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController.js');
const upload = require('../middlewares/multerMiddleware.js');
//const logNewProducts = require('../middlewares/logNewProductsMiddleware.js');
const productValidation = require('../middlewares/productsValidatorMiddleware.js');
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware.js');


router.get('/', productsController.products);

router.get('/productsCat', productsController.productsCat);

router.get('/productsDog', productsController.productsDog);

router.get('/productDetail/:idProduct', productsController.detail);

router.get('/:idProduct/productEditor', productsController.editor);

router.put('/:idProduct/productEditor', upload.single('image'), productsController.update);

router.delete('/:idProduct/productEditor', productsController.destroy); 

router.get('/productCreation', productsController.productCreation);

router.post('/', upload.single('image'), productValidation, productsController.create);

router.get('/productCart', productsController.productCart);

router.get('/search', productsController.search);

router.get("/order/:idProduct", isLoggedMiddleware, productsController.order);



module.exports = router;