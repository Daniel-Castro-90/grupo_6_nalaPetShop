let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController.js')


router.get('/', productsController.productDetail);

router.get('/productCart', productsController.productCart);

router.get('/productDetail', productsController.productDetail);

router.get('/product', productsController.product);


module.exports = router;