let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController.js');
const upload = require('../middlewares/multerMiddleware.js')


router.get('/', productsController.products);

router.get('/productsCat', productsController.productsCat);

router.get('/productsDog', productsController.productsDog);

router.get('/productDetail', productsController.productDetail);

router.get('/productDetail/:idProduct', productsController.detail);

router.get('/:idProduct/productEditor', productsController.editor);

router.put('/:idProduct', productsController.update);

router.get('/productCreation', productsController.productCreation);

router.post('/', upload.single('image'), productsController.create);

router.get('/productCart', productsController.productCart);

router.get('/search', productsController.search);



module.exports = router;