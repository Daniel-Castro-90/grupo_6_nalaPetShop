let express = require('express');
let router = express.Router();
let productsController = require('../controllers/productsController.js')


router.get('/', productsController.products);

router.get('/productCart', productsController.productCart);

router.get('/productDetail', productsController.productDetail);

router.get('/productEditor', productsController.productEditor);

router.get('/productCreation', productsController.productCreation);

router.get('/search', productsController.search);



module.exports = router;